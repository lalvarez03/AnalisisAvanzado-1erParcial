// materias/algoritmos-3/pages/demostraciones.js — Técnicas de demostración (Práctica 1).

import { el, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, readout } from '../../../js/utils/page.js';

const R = String.raw;

const FORMULAS = [
  { id: 'a', txt: 'A ∧ B ⇒ A', f: (A, B) => !(A && B) || A },
  { id: 'b', txt: 'A ∨ B ⇒ A', f: (A, B) => !(A || B) || A },
  { id: 'c', txt: '(A ⇒ B) ⇒ (A ⇒ C)', f: (A, B, C) => !(!A || B) || (!A || C) },
  { id: 'd', txt: '[(A ⇒ B) ∧ (B ⇒ C)] ⇒ (A ⇒ C)', f: (A, B, C) => !((!A || B) && (!B || C)) || (!A || C) },
  { id: 'e', txt: '(¬A ∧ B) ⇔ ¬(A ∨ ¬B)', f: (A, B) => ((!A && B) === !(A || !B)) },
];

export function renderDemostraciones(root) {
  root.appendChild(pageHeader('Técnicas de demostración: inducción y absurdo',
    'Un algoritmo no sirve si no sabemos <em>por qué</em> es correcto. Esta unidad fija las herramientas con las que se justifica todo lo que sigue: '
    + 'pasar de una frase a una fórmula, elegir una técnica y no caer en los errores clásicos.'));

  root.appendChild(callout('tip', 'Antes de demostrar: formalizar',
    R`Primero hay que escribir <em>exactamente</em> qué se afirma: "para todo $n$ impar, $n^2$ es impar" es $\forall n\in\mathbb{Z}\ (n\text{ impar}\Rightarrow n^2\text{ impar})$. Una afirmación con $\forall$ no se demuestra con un ejemplo (Ej. 2a), pero se refuta con un <b>contraejemplo</b> (Ej. 4: "$n^2\le3n$ para todo $n$" es falso porque $n=4$ es contraejemplo: $16>12$).`));

  root.appendChild(callout('def', 'Las cuatro técnicas básicas',
    R`<ul>
    <li><b>Directa:</b> asumo la hipótesis $P$ y llego a $Q$ aplicando definiciones. (Ej.: $n=2k+1\Rightarrow n^2=2(2k^2+2k)+1$ es impar.)</li>
    <li><b>Contrarrecíproco:</b> para probar $P\Rightarrow Q$ pruebo $\neg Q\Rightarrow\neg P$ (equivalentes).</li>
    <li><b>Reducción al absurdo:</b> asumo $\neg(\text{tesis})$ y llego a una contradicción. (Ej. 7: 20 pelotas en 3 cajas con las tres cantidades impares ⇒ la suma sería impar, pero $20$ es par.)</li>
    <li><b>Inducción:</b> para probar $\forall n\ge n_0:\ P(n)$ pruebo el <i>caso base</i> $P(n_0)$ y el <i>paso inductivo</i> $\forall n\ge n_0:\ P(n)\Rightarrow P(n+1)$.</li></ul>`));

  root.appendChild(callout('thm', 'Principio de inducción (y por qué funciona)',
    R`Si $P(n_0)$ es verdadero y para todo $n\ge n_0$ vale $P(n)\Rightarrow P(n+1)$, entonces $P(n)$ es verdadero para todo $n\ge n_0$.`,
    R`<p>Supongamos que no: el conjunto $\{n\ge n_0: \neg P(n)\}$ es no vacío y, por el buen orden de $\mathbb{N}$, tiene un mínimo $m$. Como $P(n_0)$ vale, $m>n_0$, y entonces $m-1\ge n_0$ cumple $P(m-1)$ (por minimalidad de $m$). Por el paso inductivo, $P(m)$: contradicción. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Ejemplo completo (Ej. 12): 1 + 3 + 5 + … + (2n+1) = (n+1)²',
    R`<b>Predicado:</b> $P(n):=\sum_{i=0}^{n}(2i+1)=(n+1)^2$. <b>Base</b> $n=0$: $1=1^2$. <b>Paso:</b> asumo $P(n)$ (hipótesis inductiva). Entonces $\sum_{i=0}^{n+1}(2i+1)=(n+1)^2+(2(n+1)+1)=n^2+2n+1+2n+3=n^2+4n+4=(n+2)^2$, que es $P(n+1)$. $\blacksquare$`));

  root.appendChild(callout('warn', 'Errores clásicos de inducción (Ej. 9, 10, 11)',
    R`<ul>
    <li><b>Paso inductivo que no vale para un valor chico:</b> en "todos los elementos de un conjunto son iguales" (Ej. 10) el paso usa que dos subconjuntos de $n-1$ elementos <em>se intersecan</em>, y eso falla justo en $n=2$. El caso base y el paso deben encajar.</li>
    <li><b>Hipótesis inductiva más débil de lo que se usa:</b> en "$a^n=1$" (Ej. 9) el paso usa $a^{n-2}=1$ y $a^{n-1}=1$ (dos casos previos) pero la base solo cubre $n=0$: falta el caso $n=1$ (inducción fuerte necesita dos bases).</li>
    <li><b>Inducir sobre el objeto equivocado:</b> en "si hay un positivo la suma es positiva" (Ej. 11) al sacar un elemento cualquiera puede quedar un conjunto <em>sin</em> positivos y la hipótesis no aplica. Hay que sacar un elemento <em>que no sea el positivo</em>.</li>
    <li><b>Construir "agregando" en lugar de "sacando":</b> en grafos (Ej. 2 de la Práctica 2) agregar un vértice solo genera grafos que se pueden armar así; el paso correcto toma un grafo cualquiera de $n+1$ vértices y le saca uno.</li></ul>`));

  root.appendChild(el('h2', { text: 'Laboratorio: ¿fórmula verdadera o falsa? (Ej. 1)' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Elegí una fórmula: se calcula su tabla de verdad. Las filas en rojo son contraejemplos (valuaciones de A, B, C que la hacen falsa).' }));
  const sel = selectControl({ label: 'Fórmula: ', value: 'a', options: FORMULAS.map((f) => ({ value: f.id, label: f.txt })) });
  root.appendChild(el('div', { class: 'controls' }, [sel.wrap]));
  const tabla = el('div', {});
  const out = readout('');
  const dibujar = () => {
    const F = FORMULAS.find((f) => f.id === sel.select.value); const filas = [];
    for (let m = 0; m < 8; m++) { const A = !!(m & 4); const B = !!(m & 2); const C = !!(m & 1); filas.push({ A, B, C, v: F.f(A, B, C) }); }
    const T = (x) => (x ? 'V' : 'F');
    tabla.innerHTML = '<table class="tbl"><tr><th>A</th><th>B</th><th>C</th><th>' + F.txt + '</th></tr>'
      + filas.map((r) => `<tr style="${r.v ? '' : 'color:#ff6b7a;font-weight:700'}"><td>${T(r.A)}</td><td>${T(r.B)}</td><td>${T(r.C)}</td><td>${T(r.v)}</td></tr>`).join('') + '</table>';
    const malas = filas.filter((r) => !r.v);
    out.textContent = malas.length
      ? `FALSA en general: contraejemplo A=${T(malas[0].A)}, B=${T(malas[0].B)}, C=${T(malas[0].C)}.`
      : 'VERDADERA (tautología): es verdadera en todas las filas. Para demostrarlo en general alcanza con razonar con las definiciones, no con la tabla.';
  };
  sel.select.addEventListener('change', dibujar);
  root.appendChild(tabla); root.appendChild(out); dibujar();
}
