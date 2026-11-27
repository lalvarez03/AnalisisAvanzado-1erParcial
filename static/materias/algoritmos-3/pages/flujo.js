// materias/algoritmos-3/pages/flujo.js — Flujo máximo, corte mínimo, Edmonds–Karp y modelado (Práctica 9).

import { el, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { dibujarGrafo, RED_FLUJO, pasosEdmondsKarp, nombreNodo, controlPasos } from '../lib.js';

const R = String.raw;

export function renderFlujo(root) {
  root.appendChild(pageHeader('Max-flow min-cut y Edmonds–Karp',
    'Pensá en una red de cañerías: cada una tiene una capacidad y queremos mandar la mayor cantidad posible de agua de una fuente $s$ a un sumidero $t$. '
    + 'Esa idea tan concreta resuelve problemas que parecen no tener nada que ver: asignaciones, caminos disjuntos, matchings.'));

  root.appendChild(callout('def', 'Red, flujo y valor',
    R`Una <b>red</b> es un digrafo con capacidades $c(e)\ge0$ y dos vértices $s$ (fuente) y $t$ (sumidero). Un <b>flujo</b> $f:E\to\mathbb{R}_{\ge0}$ cumple: <i>capacidad</i> $0\le f(e)\le c(e)$ y <i>conservación</i> $\sum_{e\text{ entra a }v}f(e)=\sum_{e\text{ sale de }v}f(e)$ para todo $v\neq s,t$. Su <b>valor</b> es $|f|=\sum_{e\text{ sale de }s}f(e)-\sum_{e\text{ entra a }s}f(e)$.
    Un <b>corte</b> $(S,\bar S)$ con $s\in S$, $t\in\bar S$ tiene capacidad $c(S,\bar S)=\sum_{u\in S,v\in\bar S}c(u,v)$.`));

  root.appendChild(callout('def', 'Red residual y caminos de aumento',
    R`Dado un flujo $f$, la <b>red residual</b> $G_f$ tiene, por cada arista $e=(u,v)$: una arista $u\to v$ de capacidad $c(e)-f(e)$ (se puede empujar más) y una arista $v\to u$ de capacidad $f(e)$ (se puede "deshacer" flujo). Un <b>camino de aumento</b> es un camino $s\to t$ en $G_f$; su <b>cuello de botella</b> es la menor capacidad residual del camino y es cuánto se puede aumentar el flujo. <b>Ford–Fulkerson</b> repite: buscar un camino de aumento y empujar el cuello de botella. <b>Edmonds–Karp</b> lo busca con <b>BFS</b> (el más corto en aristas) y tarda $O(nm^2)$.`));

  root.appendChild(callout('thm', 'Flujo cruza cualquier corte (dualidad débil)',
    R`Para todo flujo $f$ y todo corte $(S,\bar S)$: $\ |f|=f(S,\bar S)-f(\bar S,S)\le c(S,\bar S)$. En particular el flujo máximo $\le$ capacidad del corte mínimo.`,
    R`<p>Sumando la conservación $\sum_{\text{sale}}f-\sum_{\text{entra}}f=0$ sobre todos los $v\in S\setminus\{s\}$ y agregando la definición de $|f|$ en $s$, las aristas con ambos extremos en $S$ se cancelan (cada una suma una vez y resta una vez): queda $|f|=f(S,\bar S)-f(\bar S,S)$. Como $f(S,\bar S)\le c(S,\bar S)$ y $f(\bar S,S)\ge0$, resulta $|f|\le c(S,\bar S)$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Teorema del flujo máximo y corte mínimo',
    R`Para un flujo $f$ son equivalentes: (i) $f$ es máximo; (ii) $G_f$ no tiene camino de aumento; (iii) existe un corte $(S,\bar S)$ con $|f|=c(S,\bar S)$. Por lo tanto <b>flujo máximo = capacidad del corte mínimo</b>. Si las capacidades son enteras, existe un flujo máximo entero.`,
    R`<p>(i)⇒(ii): si hubiera un camino de aumento se podría empujar flujo positivo y $f$ no sería máximo.</p>
    <p>(ii)⇒(iii): sea $S$ el conjunto de vértices alcanzables desde $s$ en $G_f$; $t\notin S$. Toda arista $(u,v)$ con $u\in S$, $v\notin S$ está <b>saturada</b> ($f=c$): si no, $v$ sería alcanzable. Toda arista $(v,u)$ con $v\notin S$, $u\in S$ tiene $f=0$: si no, la arista residual $u\to v$ haría alcanzable a $v$. Entonces $|f|=f(S,\bar S)-f(\bar S,S)=c(S,\bar S)-0$.</p>
    <p>(iii)⇒(i): por la dualidad débil, ningún flujo supera $c(S,\bar S)=|f|$. <b>Entero:</b> cada aumento con capacidades enteras es entero (cuello de botella entero), y Ford–Fulkerson aumenta al menos 1 por paso, así que termina. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Modelado: ¿qué problemas son de flujo?',
    R`<ul><li><b>Caminos disjuntos en aristas</b> de $s$ a $t$ (Ej. 3): capacidad $1$ en todas las aristas; flujo máximo = cantidad máxima de caminos. Para <em>disjuntos en vértices</em> se parte cada vértice $v$ en $v_{in}\to v_{out}$ con capacidad $1$.</li>
    <li><b>Matching máximo bipartito</b> (Ej. 5): $s\to$ cada persona (cap. 1), persona $\to$ tarea que puede hacer (cap. 1), tarea $\to t$ (cap. 1). Valor = cantidad de tareas asignadas.</li>
    <li><b>Asignación con cupos</b> (Ej. 6, 8): las capacidades de las aristas $s\to$ y $\to t$ son los cupos; las intermedias, las restricciones de pertenencia.</li>
    <li><b>Corte mínimo</b> (Ej. 2): dado un flujo máximo, el conjunto $S$ de alcanzables desde $s$ en $G_f$ da un corte mínimo en $O(n+m)$.</li></ul>
    Para demostrar un modelado se prueba la <b>doble implicación</b>: de un flujo entero de valor $k$ se construye una solución de tamaño $k$, y de una solución de tamaño $k$ se construye un flujo de valor $k$.`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>Olvidar las aristas "hacia atrás" de la red residual: sin ellas el algoritmo puede quedar trabado lejos del máximo.</li><li>Elegir caminos de aumento arbitrarios con capacidades grandes: Ford–Fulkerson puede tardar tiempo proporcional al <em>valor</em> del flujo; Edmonds–Karp (BFS) no depende de las capacidades.</li><li>Pensar que "si todas las capacidades son pares, el flujo en <em>cada</em> arista de <em>todo</em> flujo máximo es par": solo existe <em>uno</em> con esa propiedad (Ej. 1b).</li></ul>`));

  root.appendChild(el('h2', { text: 'Laboratorio: Edmonds–Karp paso a paso' }));
  const g = RED_FLUJO; const fotos = pasosEdmondsKarp(g, 0, 5);
  const cp = controlPasos(fotos.length - 1, () => viz.redraw());
  root.appendChild(cp.wrap);
  const out = readout('');
  const viz = mountCanvas(root, { height: 340, view: {}, hint: 'cada arista muestra flujo/capacidad · rosa = camino de aumento · naranja punteado = corte mínimo final' });
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); const F = fotos[cp.valor()];
    const enCamino = new Set(); if (F.camino) for (let i = 0; i + 1 < F.camino.length; i++) enCamino.add(F.camino[i] + ',' + F.camino[i + 1]);
    const S = F.corte ? new Set(F.corte) : null;
    dibujarGrafo(p, g, {
      aristaTexto: (k) => { const [u, v, c] = g.aristas[k]; return `${F.flujo[u][v]}/${c}`; },
      aristaColor: (k) => { const [u, v, c] = g.aristas[k]; if (enCamino.has(u + ',' + v)) return COLORS.pink; if (S && S.has(u) && !S.has(v)) return COLORS.warn; const f = F.flujo[u][v]; return f === 0 ? COLORS.textDim : f >= c ? COLORS.err : COLORS.ok; },
      aristaGrosor: (k) => { const [u, v] = g.aristas[k]; return enCamino.has(u + ',' + v) ? 4 : 2.5; },
      aristaDash: (k) => { const [u, v] = g.aristas[k]; return !!(S && S.has(u) && !S.has(v)); },
      nodoFill: (i) => (S ? (S.has(i) ? 'rgba(53,201,138,0.4)' : 'rgba(255,107,122,0.3)') : COLORS.panel),
    });
    out.textContent = `${F.texto}\nvalor del flujo = ${F.valor}` + (F.corte ? ` · S = {${F.corte.map((i) => nombreNodo(g, i)).join(', ')}} · capacidad del corte (S, V∖S) = ${g.aristas.filter(([u, v]) => S.has(u) && !S.has(v)).reduce((s, [, , c]) => s + c, 0)} = flujo máximo ✓` : '');
  });
  root.appendChild(out);
  root.appendChild(callout('tip', 'Qué observar',
    R`Verde = flujo parcial, rojo = arista saturada. En el último paso, las aristas punteadas anaranjadas (del conjunto $S$ de alcanzables al resto) están todas saturadas, y la suma de sus capacidades es <em>exactamente</em> el valor del flujo: esa es la demostración visual del teorema max-flow min-cut.`));

  seccionInOut(root);
}

// ---------------------------------------------------------------------------
// Punto difícil: PARTIR VÉRTICES en entrada/salida (v_in → v_out) y nodos intermedios
// ---------------------------------------------------------------------------
function seccionInOut(root) {
  root.appendChild(el('h2', { text: 'Punto difícil: flujos con vértices partidos (in / out)' }));

  root.appendChild(callout('tip', 'El problema: el flujo solo tiene capacidades en las aristas',
    R`Una red solo sabe limitar lo que pasa <em>por una arista</em>. Pero muchos enunciados limitan lo que pasa <em>por un vértice</em>: "cada intersección la usa a lo sumo un camino", "cada médico trabaja a lo sumo $C$ días", "la sala $j$ tiene $m_j$ lugares". Para que esa restricción sea una capacidad de arista, <b>se parte el vértice en dos</b>: una puerta de entrada y una de salida unidas por una arista cuya capacidad es el límite.`));

  root.appendChild(callout('def', 'La construcción v → (v_in, v_out)',
    R`Para cada vértice $v$ con límite $c(v)$:
    <ol><li>Se reemplaza $v$ por dos vértices, $v_{in}$ y $v_{out}$.</li>
    <li><b>Toda arista que entraba a $v$ ahora entra a $v_{in}$:</b> $(u,v)\ \leadsto\ (u_{out},v_{in})$.</li>
    <li><b>Toda arista que salía de $v$ ahora sale de $v_{out}$:</b> $(v,w)\ \leadsto\ (v_{out},w_{in})$.</li>
    <li>Se agrega la arista interna $v_{in}\to v_{out}$ con capacidad $c(v)$: <em>todo el flujo que atraviesa $v$ debe pasar por ahí</em>.</li></ol>
    Interpretación: $v_{in}$ = "llegué a $v$", $v_{out}$ = "me voy de $v$", y la arista del medio es el <b>cupo del vértice</b>. Para $s$ y $t$ no se parte (no tienen límite): $s$ solo tiene salida y $t$ solo entrada.`));

  root.appendChild(callout('thm', 'Correctitud de la partición',
    R`Sea $G'$ la red obtenida partiendo cada vértice interno con capacidad $c(v)$. Entonces los flujos de $G'$ se corresponden con los flujos de $G$ que cumplen "$\text{flujo que atraviesa }v\le c(v)$", con el mismo valor.`,
    R`<p>($\Leftarrow$) Dado un flujo de $G$ con flujo $f(u,v)$ por cada arista, se define en $G'$: $f'(u_{out},v_{in})=f(u,v)$ y $f'(v_{in},v_{out})=$ flujo que entra a $v$ (= flujo que sale, por conservación). Esa última cantidad es $\le c(v)$ por hipótesis, y la conservación vale en $v_{in}$ (entra lo mismo que sale por la arista interna) y en $v_{out}$.</p>
    <p>($\Rightarrow$) Dado un flujo de $G'$, se define $f(u,v)=f'(u_{out},v_{in})$. En $v_{in}$ toda la entrada sale por la única arista $v_{in}\to v_{out}$, de capacidad $c(v)$: el flujo que atraviesa $v$ es $\le c(v)$, y la conservación en $v$ se hereda de la de $v_{in}$ y $v_{out}$. El valor no cambia. $\blacksquare$</p>
    <p><b>Tamaño:</b> $2n-2+2$ vértices y $m+n-2$ aristas: sigue siendo lineal, así que la complejidad de Edmonds–Karp es $O(nm^2)$ con las mismas variables (hasta constantes).</p>`));

  root.appendChild(callout('thm', 'Caminos disjuntos en aristas vs. en vértices (Ej. 3, 4)',
    R`<ul><li><b>Disjuntos en aristas:</b> capacidad $1$ en cada arista. Los caminos pueden compartir vértices.</li>
    <li><b>Disjuntos en vértices</b> (salvo $s,t$): <em>además</em> se parte cada vértice interno con capacidad $1$ en $v_{in}\to v_{out}$. Dos caminos que pasaran por el mismo $v$ necesitarían 2 unidades por esa arista: imposible.</li>
    <li><b>Consecuencia (Menger):</b> la cantidad máxima de caminos disjuntos en vértices es igual al <em>mínimo de vértices que hay que sacar</em> para desconectar $s$ de $t$. Es lo que pide el Ej. 4(b): los "súbditos" se ubican en los vértices de un corte mínimo de la red partida (cuyas aristas del corte son las internas $v_{in}\to v_{out}$).</li></ul>`));

  root.appendChild(callout('tip', 'Otra forma de "nodo intermedio": agrupar restricciones (Ej. 6, 8)',
    R`No todo vértice extra viene de partir. A veces se agregan nodos intermedios para que una restricción de <em>grupo</em> sea una capacidad. <b>Hospital (Ej. 8):</b> un médico puede trabajar a lo sumo $C$ días <em>y</em> a lo sumo uno por período de feriado. Red: $s\to\text{médico}_i$ (cap. $C$); $\text{médico}_i\to(\text{médico}_i,\text{período }k)$ (cap. 1: <b>nodo intermedio por par médico–período</b>); $(\text{médico}_i,\text{período }k)\to\text{día}$ si está disponible (cap. 1); $\text{día}\to t$ (cap. 1). Hay asignación válida $\iff$ el flujo máximo es igual a la cantidad total de días. El nodo $(i,k)$ es el que vuelve "a lo sumo uno por período" una capacidad de arista.`));

  root.appendChild(callout('warn', 'Errores típicos',
    R`<ul><li><b>Poner el límite en la arista equivocada:</b> la capacidad $c(v)$ va en $v_{in}\to v_{out}$, no en las aristas originales.</li>
    <li><b>Conectar mal las aristas partidas:</b> las que <em>entran</em> deben ir a $v_{in}$ y las que <em>salen</em> deben partir de $v_{out}$ (si se invierte, el vértice no limita nada o se crean ciclos espurios).</li>
    <li><b>Partir $s$ o $t$</b> con capacidad 1 (limitaría el flujo total).</li>
    <li>Olvidar que un modelo se demuestra en <b>ambos sentidos</b> (flujo ⇒ solución y solución ⇒ flujo) y que el flujo entero existe por integralidad.</li></ul>`));

  // Visualización
  root.appendChild(el('h3', { text: 'Visualización: la misma red con y sin vértices partidos' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Red de 7 vértices donde los dos caminos posibles pasan por el vértice m. Elegí qué se quiere maximizar y mirá cuántos caminos entran.' }));
  const modo = selectControl({ label: 'Restricción: ', value: 'aristas', options: [
    { value: 'aristas', label: 'caminos disjuntos en ARISTAS (capacidad 1 en cada arista)' },
    { value: 'vertices', label: 'caminos disjuntos en VÉRTICES (m partido, cupo 1)' },
    { value: 'cupo2', label: 'cada vértice admite 2 caminos (m partido, cupo 2)' }] });
  root.appendChild(el('div', { class: 'controls' }, [modo.wrap]));
  const cp = controlPasos(0, () => viz.redraw());
  root.appendChild(cp.wrap);
  const out = readout('');
  const viz = mountCanvas(root, { height: 330, view: {}, hint: 'verde = flujo parcial · rojo = arista saturada · rosa = camino de aumento' });
  // Red original: 0 s, 1 a, 2 b, 3 m, 4 c, 5 d, 6 t
  const ORIG = { pos: [[0.8, 3], [3, 5], [3, 1], [5, 3], [7, 5], [7, 1], [9.2, 3]], nom: ['s', 'a', 'b', 'm', 'c', 'd', 't'], ar: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]] };
  let g = null; let fotos = [];
  const construir = () => {
    const m = modo.select.value;
    if (m === 'aristas') {
      g = { nodos: ORIG.pos, nombres: ORIG.nom, dirigido: true, aristas: ORIG.ar.map(([u, v]) => [u, v, 1]) };
      fotos = pasosEdmondsKarp(g, 0, 6);
    } else {
      // Partir TODOS los vértices internos (1..5): v_in = 2k, v_out = 2k+1 con k = v; s = 0, t = 1.
      const cap = m === 'cupo2' ? 2 : 1; const interno = (v) => v >= 1 && v <= 5;
      const idIn = (v) => (v === 0 ? 0 : v === 6 ? 1 : 2 * v); const idOut = (v) => (v === 0 ? 0 : v === 6 ? 1 : 2 * v + 1);
      const nodos = Array(12).fill(null); const nombres = Array(12).fill('');
      nodos[0] = ORIG.pos[0]; nombres[0] = 's'; nodos[1] = ORIG.pos[6]; nombres[1] = 't';
      for (let v = 1; v <= 5; v++) { const [x, y] = ORIG.pos[v]; nodos[2 * v] = [x - 0.55, y]; nodos[2 * v + 1] = [x + 0.55, y]; nombres[2 * v] = ORIG.nom[v] + 'ᵢ'; nombres[2 * v + 1] = ORIG.nom[v] + 'ₒ'; }
      const aristas = [];
      for (let v = 1; v <= 5; v++) aristas.push([idIn(v), idOut(v), interno(v) && v === 3 ? cap : 1]);
      ORIG.ar.forEach(([u, v]) => aristas.push([idOut(u), idIn(v), 1]));
      // Se mapea de nuevo a índices compactos 0..11 (ya lo están: 0,1,2..11).
      g = { nodos, nombres, dirigido: true, aristas };
      fotos = pasosEdmondsKarp(g, 0, 1);
    }
    cp.setMax(fotos.length - 1); cp.reiniciar();
  };
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); const F = fotos[Math.min(cp.valor(), fotos.length - 1)];
    const enCamino = new Set(); if (F.camino) for (let i = 0; i + 1 < F.camino.length; i++) enCamino.add(F.camino[i] + ',' + F.camino[i + 1]);
    dibujarGrafo(p, g, {
      aristaTexto: (k) => { const [u, v, c] = g.aristas[k]; return `${F.flujo[u][v]}/${c}`; },
      aristaColor: (k) => { const [u, v, c] = g.aristas[k]; if (enCamino.has(u + ',' + v)) return COLORS.pink; const f = F.flujo[u][v]; return f === 0 ? COLORS.textDim : f >= c ? COLORS.err : COLORS.ok; },
      aristaGrosor: (k) => { const [u, v] = g.aristas[k]; return enCamino.has(u + ',' + v) ? 4 : 2.2; },
      nodoFill: (i) => (g.nombres[i].endsWith('ᵢ') ? 'rgba(91,140,255,0.3)' : g.nombres[i].endsWith('ₒ') ? 'rgba(255,107,214,0.3)' : COLORS.panel),
    });
    const m = modo.select.value;
    out.textContent = `${F.texto}\nflujo = ${F.valor} → ${m === 'aristas' ? 'hay ' + F.valor + ' caminos disjuntos en aristas (los dos pasan por m: ¡compartir vértice está permitido!)' : m === 'vertices' ? 'solo ' + F.valor + ' camino disjunto en vértices: m_in→m_out con capacidad 1 es el cuello de botella' : F.valor + ' caminos si cada vértice admite 2 usos'}`;
  });
  modo.select.addEventListener('change', () => { construir(); viz.redraw(); });
  construir(); root.appendChild(out);
  root.appendChild(callout('tip', 'Qué observar',
    R`En "disjuntos en vértices" la arista $m_{in}\to m_{out}$ se satura con el primer camino y el segundo ya no puede pasar: ese es <em>exactamente</em> el corte mínimo (de capacidad 1). Con cupo 2 el flujo vuelve a 2. Los nodos azules son las "puertas de entrada" y los rosas las "de salida".`));
}
