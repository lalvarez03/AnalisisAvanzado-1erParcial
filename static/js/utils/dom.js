// utils/dom.js — helpers para construir DOM y renderizar matemática.

/**
 * Crea un elemento con atributos e hijos.
 * @param {string} tag
 * @param {object} [attrs] atributos; 'class', 'html', 'text', 'on*' para listeners.
 * @param {(Node|string)[]} [children]
 */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (v !== null && v !== undefined && v !== false) {
      node.setAttribute(k, v);
    }
  }
  const list = Array.isArray(children) ? children : [children];
  for (const c of list) {
    if (c == null) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

/** Atajo: parsea un fragmento HTML y lo devuelve como un contenedor <div>. */
export function html(str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div;
}

/**
 * Vuelve a tipografiar la matemática (MathJax) dentro de un contenedor.
 *
 * IMPORTANTE: MathJax necesita que el contenedor esté conectado al DOM y con
 * ancho definido para calcular bien el tamaño de las fórmulas (usa unidades
 * 'ex' derivadas del layout). Si se tipografía un nodo suelto (ancho 0), los
 * SVG pueden salir con dimensiones erróneas y renderizarse gigantes.
 * Por eso esperamos a que el nodo esté en el documento antes de tipografiar.
 */
export function typeset(container) {
  const run = () => {
    if (!(window.MathJax && window.MathJax.typesetPromise)) return;
    // Esperar a que el contenedor esté conectado y con layout.
    let tries = 0;
    const attempt = () => {
      const connected = container.isConnected && container.offsetWidth > 0;
      if (connected || tries > 30) {
        window.MathJax.typesetPromise([container]).catch((e) => console.warn('MathJax', e));
      } else {
        tries += 1;
        requestAnimationFrame(attempt);
      }
    };
    requestAnimationFrame(attempt);
  };
  if (window.__mathjaxReady) run();
  else {
    // Reintentar hasta que MathJax cargue (CDN async).
    let tries = 0;
    const iv = setInterval(() => {
      tries += 1;
      if (window.__mathjaxReady) { clearInterval(iv); run(); }
      else if (tries > 60) clearInterval(iv);
    }, 100);
  }
}

/**
 * Crea un control tipo slider con etiqueta y valor en vivo.
 * @returns {{wrap: HTMLElement, input: HTMLInputElement, setLabel: Function}}
 */
export function slider({ label, min, max, step, value, format }) {
  const fmt = format || ((v) => v);
  const valSpan = el('span', { class: 'val', text: fmt(value) });
  const input = el('input', { type: 'range', min, max, step, value });
  const lab = el('label', {}, [label + ' = ', valSpan]);
  const wrap = el('div', { class: 'control' }, [lab, input]);
  input.addEventListener('input', () => { valSpan.textContent = fmt(Number(input.value)); });
  return {
    wrap,
    input,
    setLabel: (v) => { valSpan.textContent = fmt(v); },
  };
}

/** Crea un <select> con opciones [{value,label}]. */
export function selectControl({ label, options, value }) {
  const sel = el('select', {});
  for (const o of options) {
    const opt = el('option', { value: o.value }, o.label);
    if (o.value === value) opt.selected = true;
    sel.appendChild(opt);
  }
  const wrap = el('div', { class: 'control' }, [el('label', { text: label }), sel]);
  return { wrap, select: sel };
}
