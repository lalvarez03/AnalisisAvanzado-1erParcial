// materias/registry.js — catálogo de materias del sistema.
//
// Para agregar una materia: crear su carpeta static/materias/<id>/ (ver la skill
// "materias-componentes", o ejecutar `py tools/nueva_materia.py <id> "Nombre"`) y sumar UNA entrada acá.
// Los metadatos (nombre, ícono, color, descripción) viven acá para dibujar el menú de materias
// sin cargar el código de cada materia; `cargar` la importa recién cuando se la abre.
//
// estado: 'activa' → se puede abrir · 'proximamente' → aparece deshabilitada en el menú.

export const REGISTRO = [
  {
    id: 'analisis-avanzado',
    nombre: 'Análisis Avanzado',
    icono: '∑',
    color: '#5b8cff',
    institucion: 'DM · FCEN · UBA',
    descripcion: 'Supremos, sucesiones, cardinalidad, espacios métricos y normados, continuidad, compacidad y sucesiones de funciones. Prácticas 1 a 7.',
    estado: 'activa',
    cargar: () => import('./analisis-avanzado/index.js'),
  },
  // Agregá nuevas materias acá. (`py tools/nueva_materia.py` inserta la entrada justo antes de este comentario.)
  // Ejemplo:
  // {
  //   id: 'algebra-lineal', nombre: 'Álgebra Lineal', icono: '🧮', color: '#35c98a',
  //   institucion: 'DM · FCEN · UBA', descripcion: 'Espacios vectoriales, transformaciones lineales…',
  //   estado: 'activa', cargar: () => import('./algebra-lineal/index.js'),
  // },
];

export const MATERIA_POR_DEFECTO = 'analisis-avanzado';

export function buscarMateria(id) {
  return REGISTRO.find((m) => m.id === id) || null;
}
