// config.js — ajustes que se editan una sola vez al publicar la app.

// URL de la "Aplicación web" de Google Apps Script que recibe los comentarios
// (guarda en una planilla + Drive y te avisa por mail). Ver docs/feedback-apps-script.md.
// Si queda vacío, el formulario intenta guardar en el servidor local (/api/feedback),
// que existe cuando la app corre con iniciar_app.bat.
export const FEEDBACK_ENDPOINT = '';

// Mail al que apunta el botón "Enviar por mail" cuando falla el envío automático.
// (Un enlace mailto no puede adjuntar imágenes; para eso se ofrece descargar el archivo.)
export const FEEDBACK_EMAIL = '';

// Anti-spam: minutos que deben pasar entre dos opiniones del mismo dispositivo.
// El servidor local (app/main.py) y el Apps Script usan el mismo valor: 30 min.
export const FEEDBACK_COOLDOWN_MIN = 30;
