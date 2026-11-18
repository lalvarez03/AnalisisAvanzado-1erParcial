// pages/feedback.js — comentario positivo/negativo + hasta 2 imágenes.
// core/paginas/feedback.js — comentario positivo/negativo + hasta 2 imágenes, con límite de 1 envío cada 30 min.
//
// Destino del envío (en este orden):
//   1) FEEDBACK_ENDPOINT (Google Apps Script) si está configurado en config.js.
//   2) /api/feedback del servidor local (FastAPI), que guarda en la carpeta feedback/.
// Si ambos fallan se ofrece descargar el comentario como archivo o enviarlo por mail.

import { el } from '../../utils/dom.js';
import { pageHeader, callout } from '../../utils/page.js';
import { materiaActiva, plan } from '../materia.js';
import { lastPage, registerCleanup } from '../../state.js';
import { FEEDBACK_ENDPOINT, FEEDBACK_EMAIL, FEEDBACK_COOLDOWN_MIN } from '../../config.js';

// Anti-spam: un envío cada FEEDBACK_COOLDOWN_MIN minutos por dispositivo (el servidor también lo controla).
const COOLDOWN_MS = FEEDBACK_COOLDOWN_MIN * 60 * 1000;
const LS_ULTIMO = 'aa_feedback_ultimo_envio';
const LS_CLIENTE = 'aa_cliente_id';

/** Identificador anónimo y estable de este navegador (no es un dato personal). */
function clienteId() {
  try {
    let id = localStorage.getItem(LS_CLIENTE);
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() : 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 12));
      localStorage.setItem(LS_CLIENTE, id);
    }
    return id;
  } catch { return ''; }
}

/** Milisegundos que faltan para poder volver a enviar (0 = ya se puede). */
function msRestantes() {
  try {
    const t = Number(localStorage.getItem(LS_ULTIMO));
    if (!t) return 0;
    const r = t + COOLDOWN_MS - Date.now();
    // r > COOLDOWN_MS significa que el reloj se movió hacia atrás: no se castiga con una espera mayor al límite.
    return r > 0 ? Math.min(r, COOLDOWN_MS) : 0;
  } catch { return 0; }
}

function marcarEnvio(retryAfterSeg) {
  // Si el servidor indica cuánto falta, se alinea el reloj local con eso.
  const t = retryAfterSeg ? Date.now() - (COOLDOWN_MS - retryAfterSeg * 1000) : Date.now();
  try { localStorage.setItem(LS_ULTIMO, String(t)); } catch { /* ignore */ }
}

function formatoRestante(ms) {
  const s = Math.ceil(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

const MAX_IMAGES = 2;
const MAX_SOURCE_BYTES = 12 * 1024 * 1024; // imagen original
const MAX_SIDE = 1600;                     // px, lado mayor tras comprimir
const MAX_TEXT = 2000;
const TIPOS_OK = ['image/png', 'image/jpeg', 'image/webp'];

/** Lee un archivo de imagen, lo reduce (lado mayor <= 1600 px) y devuelve {name, data (base64), url}. */
async function procesarImagen(file) {
  if (!TIPOS_OK.includes(file.type)) throw new Error(`"${file.name}": solo se aceptan imágenes PNG, JPG o WEBP.`);
  if (file.size > MAX_SOURCE_BYTES) throw new Error(`"${file.name}": pesa más de 12 MB.`);
  const bitmapUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error(`"${file.name}": no se pudo leer la imagen.`));
      i.src = bitmapUrl;
    });
    const escala = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * escala));
    const h = Math.max(1, Math.round(img.naturalHeight * escala));
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';            // fondo blanco por si la imagen es transparente
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    const base64 = dataUrl.split(',')[1];
    const base = file.name.replace(/\.[^.]+$/, '').slice(0, 60) || 'imagen';
    return { name: base + '.jpg', data: base64, url: dataUrl };
  } finally {
    URL.revokeObjectURL(bitmapUrl);
  }
}

async function enviar(payload) {
  const cuerpo = JSON.stringify(payload);
  if (FEEDBACK_ENDPOINT) {
    // text/plain evita el preflight CORS (Apps Script no responde a OPTIONS).
    const r = await fetch(FEEDBACK_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: cuerpo });
    const j = await r.json().catch(() => ({}));
    if (j.code === 'rate') throw errorLimite(j.retryAfter);
    if (!r.ok || j.status !== 'ok') throw new Error(j.message || 'El servicio de comentarios no respondió bien.');
    return;
  }
  const r = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo });
  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    if (r.status === 429) throw errorLimite(j.retry_after || Number(r.headers.get('Retry-After')) || FEEDBACK_COOLDOWN_MIN * 60);
    throw new Error(typeof j.detail === 'string' ? j.detail : 'No se pudo guardar el comentario (¿la app está corriendo con el servidor?).');
  }
}

/** Error de límite de envíos (el servidor dice cuántos segundos faltan). */
function errorLimite(segundos) {
  const e = new Error('Ya enviaste una opinión hace poco');
  e.limite = true;
  e.retryAfter = Math.max(1, Math.min(Number(segundos) || FEEDBACK_COOLDOWN_MIN * 60, FEEDBACK_COOLDOWN_MIN * 60));
  return e;
}

function descargarJSON(payload) {
  const data = { ...payload, fecha: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `feedback_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function mailtoLink(payload) {
  const asunto = `Feedback ${payload.tipo} — ${payload.materia || 'App de estudio'}`;
  const cuerpo = `Materia: ${payload.materia || '-'}\nTema: ${payload.tema || '-'}\n\n${payload.comentario}\n\n(Adjuntá a mano el archivo descargado o las imágenes si querés.)`;
  return `mailto:${encodeURIComponent(FEEDBACK_EMAIL)}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

export function renderFeedback(root) {
  root.appendChild(pageHeader(
    'Tu opinión',
    'Contanos qué te sirvió y qué no: un error en una demostración, una explicación confusa, algo que falta o algo que te encantó. '
    + 'Podés adjuntar hasta <strong>2 imágenes</strong> (capturas de pantalla, por ejemplo).'
  ));

  const state = { tipo: 'positivo', imagenes: [], enviando: false };

  // --- Tipo: positivo / negativo ---
  const tipoWrap = el('fieldset', { class: 'fb-tipo' }, [el('legend', { text: '¿Cómo fue tu experiencia?' })]);
  const opciones = [
    ['positivo', '👍', 'Positivo', 'Algo que funcionó o que te ayudó'],
    ['negativo', '👎', 'Negativo', 'Un error, algo confuso o que falta'],
  ];
  const optsGrid = el('div', { class: 'fb-opts' });
  tipoWrap.appendChild(optsGrid);
  opciones.forEach(([valor, ic, titulo, desc], i) => {
    const id = 'fb-tipo-' + valor;
    const input = el('input', { type: 'radio', name: 'fb-tipo', id, value: valor, checked: i === 0 ? 'checked' : null });
    input.addEventListener('change', () => { state.tipo = valor; });
    optsGrid.appendChild(el('label', { class: 'fb-opt ' + valor, for: id }, [
      input,
      el('span', { class: 'fb-opt-body' }, [
        el('strong', { text: `${ic} ${titulo}` }),
        el('small', { text: desc }),
      ]),
    ]));
  });

  // --- Tema ---
  const tema = el('select', { id: 'fb-tema' });
  tema.appendChild(el('option', { value: '' }, 'General / toda la app'));
  const { PAGINAS_TEORIA, PAGE_TITLES, HERRAMIENTAS } = plan();
  PAGINAS_TEORIA.forEach((id) => tema.appendChild(el('option', { value: PAGE_TITLES[id] }, PAGE_TITLES[id])));
  HERRAMIENTAS.filter((h) => h.id !== 'feedback').forEach((h) =>
    tema.appendChild(el('option', { value: h.titulo }, h.titulo)));
  tema.appendChild(el('option', { value: 'Pomodoro / menú' }, 'Pomodoro / menú'));
  const ult = lastPage();
  if (ult && PAGE_TITLES[ult] && [...tema.options].some((o) => o.value === PAGE_TITLES[ult])) tema.value = PAGE_TITLES[ult];

  // --- Comentario ---
  const texto = el('textarea', {
    id: 'fb-texto', rows: 6, maxlength: String(MAX_TEXT), required: 'required',
    placeholder: 'Escribí tu comentario…', 'aria-describedby': 'fb-count',
  });
  const contador = el('small', { id: 'fb-count', class: 'fb-count', text: `0 / ${MAX_TEXT}` });
  texto.addEventListener('input', () => { contador.textContent = `${texto.value.length} / ${MAX_TEXT}`; });

  // --- Contacto opcional ---
  const contacto = el('input', { type: 'text', id: 'fb-contacto', maxlength: '120', autocomplete: 'off', placeholder: 'Mail o nombre (opcional)' });

  // --- Honeypot (los humanos no lo ven) ---
  const honey = el('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true', class: 'fb-honey' });

  // --- Imágenes ---
  const fileInput = el('input', { type: 'file', id: 'fb-files', accept: 'image/png,image/jpeg,image/webp', multiple: 'multiple', class: 'fb-file' });
  const drop = el('label', { class: 'fb-drop', for: 'fb-files' }, [
    el('span', { class: 'fb-drop-ic', text: '🖼️' }),
    el('span', { html: '<strong>Elegí o arrastrá hasta 2 imágenes</strong><br><small>PNG, JPG o WEBP · se reducen automáticamente antes de enviarse</small>' }),
  ]);
  const previews = el('div', { class: 'fb-previews' });
  const imgMsg = el('div', { class: 'fb-msg', role: 'status', 'aria-live': 'polite' });

  function renderPreviews() {
    previews.innerHTML = '';
    state.imagenes.forEach((im, idx) => {
      const quitar = el('button', { type: 'button', class: 'fb-del', 'aria-label': `Quitar ${im.name}` }, '✕');
      quitar.addEventListener('click', () => { state.imagenes.splice(idx, 1); renderPreviews(); });
      previews.appendChild(el('figure', { class: 'fb-prev' }, [
        el('img', { src: im.url, alt: `Vista previa de ${im.name}` }),
        el('figcaption', { text: im.name }),
        quitar,
      ]));
    });
    drop.style.display = state.imagenes.length >= MAX_IMAGES ? 'none' : '';
  }

  async function agregarArchivos(lista) {
    imgMsg.textContent = '';
    imgMsg.className = 'fb-msg';
    const libres = MAX_IMAGES - state.imagenes.length;
    const files = [...lista];
    if (files.length > libres) {
      imgMsg.textContent = `Solo se pueden adjuntar ${MAX_IMAGES} imágenes como máximo.`;
      imgMsg.classList.add('err');
    }
    for (const f of files.slice(0, Math.max(0, libres))) {
      try { state.imagenes.push(await procesarImagen(f)); }
      catch (e) { imgMsg.textContent = e.message; imgMsg.classList.add('err'); }
    }
    renderPreviews();
  }

  fileInput.addEventListener('change', async () => { await agregarArchivos(fileInput.files); fileInput.value = ''; });
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (e) => { if (e.dataTransfer?.files) agregarArchivos(e.dataTransfer.files); });

  // --- Envío ---
  const estado = el('div', { class: 'fb-status', role: 'status', 'aria-live': 'polite' });
  const enviarBtn = el('button', { type: 'submit', class: 'btn' }, 'Enviar comentario');
  const acciones = el('div', { class: 'fb-fallback' });
  const limiteMsg = el('div', { class: 'fb-limit', role: 'status', 'aria-live': 'polite', hidden: 'hidden' });

  const form = el('form', { class: 'fb-form', novalidate: 'novalidate' }, [
    tipoWrap,
    el('div', { class: 'fb-field' }, [el('label', { for: 'fb-tema', text: '¿Sobre qué tema?' }), tema]),
    el('div', { class: 'fb-field' }, [el('label', { for: 'fb-texto', text: 'Tu comentario' }), texto, contador]),
    el('div', { class: 'fb-field' }, [el('span', { class: 'fb-label', text: `Imágenes (opcional, máximo ${MAX_IMAGES})` }), drop, fileInput, imgMsg, previews]),
    el('div', { class: 'fb-field' }, [el('label', { for: 'fb-contacto', text: 'Contacto (opcional, por si querés que te respondamos)' }), contacto]),
    honey,
    el('div', { class: 'controls' }, [enviarBtn]),
    limiteMsg,
    estado,
    acciones,
  ]);

  function armarPayload() {
    return {
      tipo: state.tipo,
      materia: materiaActiva().id,
      tema: tema.value,
      comentario: texto.value.trim(),
      contacto: contacto.value.trim(),
      imagenes: state.imagenes.map((i) => ({ name: i.name, data: i.data })),
      website: honey.value,
      cliente: clienteId(),
    };
  }

  // --- Límite de envíos: bloqueo con cuenta regresiva ---
  let temporizador = null;
  function actualizarBloqueo() {
    const falta = msRestantes();
    if (falta > 0) {
      enviarBtn.disabled = true;
      enviarBtn.textContent = `Podés volver a enviar en ${formatoRestante(falta)}`;
      limiteMsg.hidden = false;
      limiteMsg.textContent = `Ya enviaste una opinión. Para evitar spam, solo se puede enviar una cada ${FEEDBACK_COOLDOWN_MIN} minutos.`;
      if (!temporizador) temporizador = setInterval(actualizarBloqueo, 1000);
    } else {
      if (temporizador) { clearInterval(temporizador); temporizador = null; }
      limiteMsg.hidden = true;
      if (!state.enviando) { enviarBtn.disabled = false; enviarBtn.textContent = 'Enviar comentario'; }
    }
  }
  registerCleanup(() => { if (temporizador) clearInterval(temporizador); });

  function mostrarFallback(payload) {
    acciones.innerHTML = '';
    acciones.appendChild(el('p', { class: 'fb-hint', text: 'Podés conservar tu comentario de todas formas:' }));
    const dl = el('button', { type: 'button', class: 'btn ghost' }, '⬇ Descargar como archivo');
    dl.addEventListener('click', () => descargarJSON(payload));
    acciones.appendChild(dl);
    if (FEEDBACK_EMAIL) acciones.appendChild(el('a', { class: 'btn ghost', href: mailtoLink(payload) }, '✉ Enviar por mail'));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (state.enviando) return;
    acciones.innerHTML = '';
    estado.className = 'fb-status';
    if (msRestantes() > 0) { actualizarBloqueo(); return; }   // por si se salteó el botón deshabilitado
    const payload = armarPayload();
    if (payload.comentario.length < 3) {
      estado.textContent = 'Escribí al menos unas palabras en el comentario.';
      estado.classList.add('err');
      texto.focus();
      return;
    }
    state.enviando = true;
    enviarBtn.disabled = true;
    enviarBtn.textContent = 'Enviando…';
    try {
      await enviar(payload);
      marcarEnvio();
      estado.textContent = '¡Gracias! Tu comentario se envió correctamente.';
      estado.classList.add('ok');
      texto.value = ''; contacto.value = ''; contador.textContent = `0 / ${MAX_TEXT}`;
      state.imagenes = [];
      renderPreviews();
    } catch (err) {
      if (err.limite) {
        marcarEnvio(err.retryAfter);
        estado.textContent = 'Ya enviaste una opinión hace poco. Tu comentario quedó en el formulario para cuando termine la espera.';
      } else {
        estado.textContent = 'No pudimos enviarlo: ' + (err.message || 'error de red') + '.';
        mostrarFallback(payload);
      }
      estado.classList.add('err');
    } finally {
      state.enviando = false;
      actualizarBloqueo();
    }
  });

  root.appendChild(callout('warn', 'Límite de envíos',
    `Para evitar el spam, <strong>se puede enviar una opinión cada ${FEEDBACK_COOLDOWN_MIN} minutos</strong> por dispositivo. `
    + 'Si querés agregar algo más, escribilo todo junto en un solo comentario. '
    + 'Después de enviar, el botón se bloquea y muestra cuánto falta para poder enviar otra.'));
  root.appendChild(form);
  actualizarBloqueo();
  root.appendChild(callout('', 'Privacidad',
    'Tu comentario y las imágenes se usan solo para mejorar este material. <strong>No incluyas datos personales ni de terceros en las capturas.</strong> '
    + 'El contacto es opcional.'));
  renderPreviews();
}
