#!/usr/bin/env python3
"""
Crea una materia nueva como componente autocontenido en static/materias/<id>/ y la registra.

Uso:
    py tools/nueva_materia.py <id> "Nombre de la materia" [--icono 🧮] [--color #35c98a]
                              [--institucion "DM · FCEN · UBA"] [--descripcion "..."] [--no-registrar]

Ejemplo:
    py tools/nueva_materia.py algebra-lineal "Álgebra Lineal" --icono 🧮 --color "#35c98a"

Qué genera (todo dentro de la carpeta de la materia, sin tocar el núcleo):
    index.js        manifiesto (contrato en js/core/materia.js)
    plan.js         unidades, páginas y herramientas
    pages/          páginas propias (una de ejemplo)
    guias/          ejercicios resueltos (uno de ejemplo)
    resultados.js   teoremas/propiedades por tema
    estudio.js      espacio "Estudiar por práctica" (uno de ejemplo)
    machete.html    resumen imprimible por fases (una fase de ejemplo)
    README.md       cómo completar la materia

Y agrega una entrada en static/materias/registry.js (salvo --no-registrar).
Solo usa la biblioteca estándar de Python.
"""
import argparse
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
MATERIAS = RAIZ / "static" / "materias"
REGISTRY = MATERIAS / "registry.js"
MARCA_REGISTRY = "// Agregá nuevas materias acá."

ID_VALIDO = re.compile(r"^[a-z][a-z0-9]*(-[a-z0-9]+)*$")
COLOR_VALIDO = re.compile(r"^#[0-9a-fA-F]{6}$")


def js(s: str) -> str:
    """Literal de string JS (comillas simples) seguro."""
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", " ") + "'"


# ---------------------------------------------------------------------------
# Plantillas (los tokens __X__ se reemplazan; el resto se copia tal cual)
# ---------------------------------------------------------------------------
T_INDEX = """// materias/__ID__/index.js — manifiesto de la materia "__NOMBRE_RAW__".
// Contrato: js/core/materia.js · Guía: .kiro/skills/materias-componentes/SKILL.md
// Todo el contenido de la materia vive en esta carpeta; el núcleo solo lee este manifiesto.

import { UNIDADES, HERRAMIENTAS } from './plan.js';
import { RESULTADOS } from './resultados.js';
import { ESTUDIO } from './estudio.js';
import { renderTemaEjemplo } from './pages/tema-ejemplo.js';
import { GUIA_1 } from './guias/guia-1.js';

export default {
  id: __ID_JS__,
  nombre: __NOMBRE__,
  nombreCorto: __NOMBRE__,
  icono: __ICONO__,
  color: __COLOR__,
  institucion: __INSTITUCION__,
  subtitulo: __SUBTITULO__,
  intro: __DESCRIPCION__,
  inicioRuta: 'Las unidades siguen el orden de la materia. Completá cada una con su teoría, sus ejercicios y su machete.',
  primeraPagina: 'tema-ejemplo',

  unidades: UNIDADES,
  herramientas: HERRAMIENTAS,

  // Páginas propias: id de página -> función render(root). 'inicio', 'estudio', 'guia' y 'feedback'
  // ya existen en el núcleo (se pueden pisar declarándolas acá).
  paginas: {
    'tema-ejemplo': renderTemaEjemplo,
  },

  resultados: RESULTADOS,
  estudio: ESTUDIO,
  guias: [
    { id: 'u1', nombre: 'Guía 1 · Ejemplo', datos: GUIA_1 },
  ],

  machete: 'machete.html',
};
"""

T_PLAN = """// materias/__ID__/plan.js — unidades, páginas y herramientas.
// Cada unidad agrupa páginas de teoría (cuentan para el progreso). Las herramientas son páginas sueltas.
// Los ids de página deben coincidir con las claves de `paginas` en index.js.

export const UNIDADES = [
  {
    id: 'u1', num: 1, etiqueta: 'U1', ic: '📘', color: __COLOR__,
    titulo: 'Primera unidad',
    capitulo: 'Bibliografía / capítulo de referencia',
    resumen: 'Resumen de una línea de qué se aprende en esta unidad.',
    requiere: [],
    paginas: [
      { id: 'tema-ejemplo', ic: '📘', titulo: 'Tema de ejemplo', desc: 'Reemplazá este tema por el primero de la materia.' },
    ],
  },
];

// 'estudio', 'guia' y 'feedback' tienen versión genérica en el núcleo. Sumá las herramientas propias
// (quiz, simulador, etc.) y registrá su página en `paginas`.
export const HERRAMIENTAS = [
  { id: 'estudio', ic: '🗺️', titulo: 'Estudiar por práctica', desc: 'Recetas, mapa de ejercicios y errores comunes de cada guía.' },
  { id: 'guia', ic: '📖', titulo: 'Guía resuelta', desc: 'Ejercicios resueltos paso a paso.' },
  { id: 'feedback', ic: '💬', titulo: 'Tu opinión', desc: 'Contanos qué te sirvió y qué no (hasta 2 imágenes).' },
];
"""

T_PAGINA = """// materias/__ID__/pages/tema-ejemplo.js — página de teoría de ejemplo.
// Usa el kit compartido (js/utils): pageHeader/callout/mountCanvas, slider/el y solvedExercise.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';

export function renderTemaEjemplo(root) {
  root.appendChild(pageHeader('Tema de ejemplo', 'Motivación en una o dos frases: ¿qué problema resuelve este tema?'));

  root.appendChild(callout('def', 'Definición',
    'Escribí la definición formal con cuantificadores completos: $\\\\forall \\\\varepsilon>0\\\\ \\\\exists \\\\delta>0\\\\ \\\\dots$'));

  root.appendChild(callout('thm', 'Teorema',
    'Enunciado del teorema.',
    '<p>Demostración paso a paso, justificando cada paso. $\\\\blacksquare$</p>'));

  // Visualización manipulable (opcional): un slider que cambia lo que se dibuja.
  const s = slider({ label: 'a', min: 0, max: 1, step: 0.01, value: 0.5, format: (v) => v.toFixed(2) });
  root.appendChild(el('div', { class: 'controls' }, [s.wrap]));
  const viz = mountCanvas(root, { height: 260, view: { xmin: 0, xmax: 1, ymin: 0, ymax: 1 }, hint: 'mové el slider' });
  viz.setDraw(() => {
    const p = viz.plane;
    p.clear();
    p.grid(0.25);
    p.dot(Number(s.input.value), Number(s.input.value), 6, COLORS.accent);
  });
  s.input.addEventListener('input', () => viz.redraw());
}
"""

T_RESULTADOS = """// materias/__ID__/resultados.js — checklist de teoremas/propiedades por página de teoría.
// Cada ítem: { n: nombre, e: enunciado, ref?: 'Teo. 1.2', p?: 'idea de la prueba' } (HTML/LaTeX).

export const RESULTADOS = {
  'tema-ejemplo': [
    { n: 'Nombre del resultado', ref: 'Teo. 1.1', e: 'Enunciado del resultado con $\\\\LaTeX$.', p: 'Idea de la demostración en una línea.' },
  ],
};
"""

T_ESTUDIO = """// materias/__ID__/estudio.js — espacio "Estudiar por práctica". Un objeto por guía (mismo `id` que en `guias`).

export const ESTUDIO = [
  {
    id: 'u1',
    titulo: 'Guía 1 · Ejemplo',
    teoria: 'Capítulo o apuntes de referencia',
    paginas: [['tema-ejemplo', 'Tema de ejemplo']],           // [idPagina, nombre] → botones a la teoría
    resumen: 'La idea de la guía en una mirada.',
    saber: ['Definición o resultado que hay que saber antes de empezar.'],
    recetas: [['Cómo se ataca este tipo de ejercicio', 'Pasos concretos de la técnica.']],
    mapa: [['1', 'Tema del ejercicio', 'Técnica', 'Teoría previa']], // [ej., tema, técnica, teoría]
    errores: ['Error común que conviene evitar.'],
  },
];
"""

T_GUIA = """// materias/__ID__/guias/guia-1.js — ejercicios resueltos de la guía 1.
// Formato del componente solvedExercise (js/utils/resueltos.js):
//   { fuente, enunciado, idea?, pasos: [{ idea, detalle }], conclusion? }  — todo HTML/LaTeX.

export const GUIA_1 = [
  {
    fuente: 'Guía 1 · Ej. 1',
    enunciado: 'Enunciado del ejercicio.',
    idea: 'Estrategia general en una o dos frases.',
    pasos: [
      { idea: 'Primer paso', detalle: '<p>Desarrollo del paso, con cada justificación.</p>' },
      { idea: 'Segundo paso', detalle: '<p>Cierre de la demostración. $\\\\blacksquare$</p>' },
    ],
    conclusion: 'Qué se aprendió con este ejercicio.',
  },
];
"""

T_MACHETE = """<!-- materias/__ID__/machete.html — fragmento del machete (se carga desde machete.html?m=__ID__).
     Una <section class="fase"> por fase. data-practica="..." agrega una etiqueta en el encabezado.
     El índice superior se arma solo a partir de .fase-num y .fase-title. -->
<section class="fase" id="f1" data-practica="Guía 1">
  <div class="fase-head">
    <div class="fase-num">1</div>
    <div>
      <h2 class="fase-title">Primera unidad</h2>
      <p class="fase-sub">Una línea sobre qué cubre la fase.</p>
    </div>
  </div>
  <div class="fase-body">
    <div class="defs-clave">
      <h3>🔑 Definiciones clave</h3>
      <dl>
        <div class="def-item"><dt>Concepto</dt><dd>Definición breve con $\\LaTeX$.</dd></div>
      </dl>
    </div>
    <div class="m-cols">
      <div class="m-card">
        <h2>Resultado</h2>
        <p><span class="m-tag thm">thm</span>Enunciado del teorema.</p>
      </div>
    </div>
  </div>
</section>
"""

T_README = """# __NOMBRE_RAW__

Materia creada con `py tools/nueva_materia.py`. Es un componente autocontenido: todo lo que la define
está en esta carpeta; el núcleo (`static/js/core/`) solo lee `index.js`.

## Qué completar (en este orden)
1. `plan.js` — unidades y páginas (ids de página únicos, en kebab-case).
2. `pages/<id-pagina>.js` — una página por tema (teoría + visualización). Registrarla en `index.js` → `paginas`.
3. `resultados.js` — teoremas/propiedades de cada página.
4. `guias/guia-N.js` + `estudio.js` — ejercicios resueltos y su espacio de estudio (mismo `id` en `guias`).
5. `machete.html` — resumen imprimible por fases.
6. (Opcional) herramientas propias (quiz, simulador): sumarlas en `plan.js` → `HERRAMIENTAS` y `index.js` → `paginas`.

Guía completa: `.kiro/skills/materias-componentes/SKILL.md`.
"""

ARCHIVOS = {
    "index.js": T_INDEX,
    "plan.js": T_PLAN,
    "pages/tema-ejemplo.js": T_PAGINA,
    "resultados.js": T_RESULTADOS,
    "estudio.js": T_ESTUDIO,
    "guias/guia-1.js": T_GUIA,
    "machete.html": T_MACHETE,
    "README.md": T_README,
}


def registrar(id_: str, nombre: str, icono: str, color: str, institucion: str, descripcion: str) -> bool:
    """Inserta la entrada en registry.js antes del marcador. Devuelve False si no se pudo."""
    if not REGISTRY.exists():
        return False
    texto = REGISTRY.read_text(encoding="utf-8")
    if re.search(rf"^\s*id:\s*'{re.escape(id_)}'", texto, re.M):  # ignora ejemplos comentados
        print(f"· registry.js ya contiene '{id_}': no se duplica.")
        return True
    if MARCA_REGISTRY not in texto:
        return False
    entrada = (
        "  {\n"
        f"    id: {js(id_)},\n"
        f"    nombre: {js(nombre)},\n"
        f"    icono: {js(icono)},\n"
        f"    color: {js(color)},\n"
        f"    institucion: {js(institucion)},\n"
        f"    descripcion: {js(descripcion)},\n"
        "    estado: 'activa',\n"
        f"    cargar: () => import('./{id_}/index.js'),\n"
        "  },\n"
    )
    # El marcador está dentro de una línea con indentación: se inserta justo antes de esa línea.
    idx = texto.index(MARCA_REGISTRY)
    inicio_linea = texto.rfind("\n", 0, idx) + 1
    REGISTRY.write_text(texto[:inicio_linea] + entrada + texto[inicio_linea:], encoding="utf-8", newline="\n")
    return True


def main(argv=None) -> int:
    # Consolas de Windows (cp1252) no pueden imprimir ✓/→: forzar UTF-8 sin romper si no hay reconfigure.
    for flujo in (sys.stdout, sys.stderr):
        if hasattr(flujo, "reconfigure"):
            flujo.reconfigure(encoding="utf-8", errors="replace")

    ap = argparse.ArgumentParser(description="Crea una materia nueva en static/materias/<id>/.")
    ap.add_argument("id", help="identificador en kebab-case (ej. algebra-lineal)")
    ap.add_argument("nombre", help='nombre visible (ej. "Álgebra Lineal")')
    ap.add_argument("--icono", default="📘")
    ap.add_argument("--color", default="#5b8cff", help="color de acento #rrggbb")
    ap.add_argument("--institucion", default="")
    ap.add_argument("--descripcion", default="")
    ap.add_argument("--no-registrar", action="store_true", help="no modificar registry.js")
    a = ap.parse_args(argv)

    if not ID_VALIDO.match(a.id) or len(a.id) > 40:
        print("Error: el id debe ser kebab-case (a-z, 0-9 y guiones), p. ej. 'algebra-lineal'.", file=sys.stderr)
        return 2
    if not COLOR_VALIDO.match(a.color):
        print("Error: --color debe tener la forma #rrggbb.", file=sys.stderr)
        return 2
    nombre = a.nombre.strip()
    if not nombre:
        print("Error: el nombre no puede estar vacío.", file=sys.stderr)
        return 2

    destino = MATERIAS / a.id
    if destino.exists():
        print(f"Error: ya existe {destino.relative_to(RAIZ)}. No se sobrescribe nada.", file=sys.stderr)
        return 1

    descripcion = a.descripcion.strip() or f"Material de estudio de {nombre}."
    subtitulo = f"{nombre}" + (f" — {a.institucion}" if a.institucion else "")
    reemplazos = {
        "__ID__": a.id,
        "__ID_JS__": js(a.id),
        "__NOMBRE_RAW__": nombre,
        "__NOMBRE__": js(nombre),
        "__ICONO__": js(a.icono),
        "__COLOR__": js(a.color),
        "__INSTITUCION__": js(a.institucion),
        "__SUBTITULO__": js(subtitulo),
        "__DESCRIPCION__": js(descripcion),
    }
    # Orden: primero los tokens más largos para no pisar prefijos (__NOMBRE_RAW__ antes que __NOMBRE__, etc.).
    orden = sorted(reemplazos, key=len, reverse=True)

    for rel, plantilla in ARCHIVOS.items():
        contenido = plantilla
        for tok in orden:
            contenido = contenido.replace(tok, reemplazos[tok])
        ruta = destino / rel
        ruta.parent.mkdir(parents=True, exist_ok=True)
        ruta.write_text(contenido, encoding="utf-8", newline="\n")

    print(f"✓ Materia creada en {destino.relative_to(RAIZ)} ({len(ARCHIVOS)} archivos).")

    if a.no_registrar:
        print("· Falta registrarla: agregá una entrada en static/materias/registry.js (ver README de la materia).")
    elif registrar(a.id, nombre, a.icono, a.color, a.institucion, descripcion):
        print("✓ Registrada en static/materias/registry.js.")
    else:
        print("! No se pudo registrar automáticamente: agregá la entrada a mano en static/materias/registry.js.")
    print(f"→ Abrila en la app: #{a.id}/inicio")
    return 0


if __name__ == "__main__":
    sys.exit(main())
