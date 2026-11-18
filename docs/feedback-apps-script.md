# Recibir el feedback: Google Apps Script (planilla + Drive + mail)

La app publicada en GitHub Pages es **solo estática**: no tiene servidor donde guardar archivos.
Esta guía conecta el formulario "Tu opinión" con un script de Google que, por cada comentario:

1. agrega una fila en una **Google Sheet** (fecha, tipo, tema, comentario, contacto, links a las imágenes),
2. guarda las imágenes en una carpeta de **Drive**,
3. te manda un **mail** con el comentario y las imágenes adjuntas.

Es gratis, no requiere tarjeta y no expone ninguna clave en el repositorio (la URL del script es pública
pero el script solo acepta comentarios con los límites de abajo).

## Pasos (5 minutos)

1. Creá una Google Sheet nueva (ej. "Feedback Análisis Avanzado").
2. En la planilla: **Extensiones → Apps Script**. Borrá el contenido y pegá el código de abajo.
3. Cambiá `EMAIL` por tu mail.
4. **Implementar → Nueva implementación → tipo "Aplicación web"**:
   - *Ejecutar como*: **Yo**.
   - *Quién tiene acceso*: **Cualquier usuario**.
   - Autorizá los permisos que pide (Sheets, Drive, Gmail).
5. Copiá la **URL de la aplicación web** y pegala en `static/js/config.js`:

   ```js
   export const FEEDBACK_ENDPOINT = 'https://script.google.com/macros/s/XXXXXXXX/exec';
   export const FEEDBACK_EMAIL = 'tu-mail@gmail.com'; // opcional, para el plan B (mailto)
   ```
6. Hacé commit y push: el workflow de GitHub Pages publica la nueva versión.

Cada vez que cambies el código del script tenés que crear una **nueva versión de la implementación**
(Implementar → Administrar implementaciones → editar → versión nueva); la URL se mantiene.

## Código del script

```javascript
const CONFIG = {
  EMAIL: 'tu-mail@gmail.com',
  FOLDER_NAME: 'Feedback Analisis Avanzado',
  SHEET_NAME: 'Feedback',
  MAX_IMAGES: 2,
  MAX_TEXT: 2000,
  MAX_IMAGE_BYTES: 3 * 1024 * 1024, // por imagen, ya decodificada
  COOLDOWN_SEG: 30 * 60,            // anti-spam: una opinión cada 30 min por navegador
  MAX_POR_HORA: 30,                 // tope global de opiniones por hora (frena abusos masivos)
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse(e.postData.contents);

    if (data.website) return json_({ status: 'ok' }); // honeypot: bots

    const tipo = data.tipo === 'negativo' ? 'negativo' : (data.tipo === 'positivo' ? 'positivo' : null);
    const comentario = String(data.comentario || '').trim().slice(0, CONFIG.MAX_TEXT);
    if (!tipo || comentario.length < 3) return json_({ status: 'error', message: 'Datos incompletos.' });

    // Anti-spam: 1 opinión cada COOLDOWN_SEG por navegador (id anónimo) + tope global por hora.
    const cliente = /^[A-Za-z0-9-]{8,64}$/.test(String(data.cliente || '')) ? String(data.cliente) : null;
    if (!cliente) return json_({ status: 'error', message: 'Falta el identificador del navegador.' });
    const cache = CacheService.getScriptCache();
    const ahora = Date.now();
    const previo = cache.get('fb_' + cliente);
    if (previo) {
      const falta = Math.ceil((CONFIG.COOLDOWN_SEG * 1000 - (ahora - Number(previo))) / 1000);
      return json_({ status: 'error', code: 'rate', retryAfter: Math.max(1, falta) });
    }
    const global = Number(cache.get('fb_global') || 0);
    if (global >= CONFIG.MAX_POR_HORA) return json_({ status: 'error', code: 'rate', retryAfter: 600 });

    const tema = String(data.tema || '').slice(0, 120);
    const contacto = String(data.contacto || '').slice(0, 120);
    const imagenes = Array.isArray(data.imagenes) ? data.imagenes : [];
    if (imagenes.length > CONFIG.MAX_IMAGES) return json_({ status: 'error', message: 'Máximo ' + CONFIG.MAX_IMAGES + ' imágenes.' });

    // Imágenes (el formulario siempre las envía como JPEG)
    const blobs = [];
    const links = [];
    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
    imagenes.forEach(function (img, i) {
      const bytes = Utilities.base64Decode(String(img.data || ''));
      if (bytes.length > CONFIG.MAX_IMAGE_BYTES) throw new Error('Imagen demasiado grande.');
      if (!(bytes[0] === -1 && bytes[1] === -40)) throw new Error('Formato de imagen no válido.'); // 0xFF 0xD8
      blobs.push(Utilities.newBlob(bytes, 'image/jpeg', stamp + '_' + (i + 1) + '.jpg'));
    });
    if (blobs.length) {
      const folder = getFolder_();
      blobs.forEach(function (b) { links.push(folder.createFile(b).getUrl()); });
    }

    // Planilla
    const sh = getSheet_();
    sh.appendRow([new Date(), tipo, safe_(tema), safe_(comentario), safe_(contacto), links.join('\n')]);

    // Mail
    MailApp.sendEmail({
      to: CONFIG.EMAIL,
      subject: 'Feedback ' + tipo + ' — Análisis Avanzado' + (tema ? ' (' + tema + ')' : ''),
      body: 'Tipo: ' + tipo + '\nTema: ' + (tema || '-') + '\nContacto: ' + (contacto || '-') + '\n\n' + comentario,
      attachments: blobs,
    });

    // Recién ahora (envío exitoso) se activa el bloqueo.
    cache.put('fb_' + cliente, String(ahora), CONFIG.COOLDOWN_SEG);
    cache.put('fb_global', String(global + 1), 3600);
    return json_({ status: 'ok' });
  } catch (err) {
    return json_({ status: 'error', message: 'No se pudo procesar el envío.' });
  } finally {
    lock.releaseLock();
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Evita que un comentario que empiece con = + - @ se interprete como fórmula en la planilla.
function safe_(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.SHEET_NAME);
    sh.appendRow(['Fecha', 'Tipo', 'Tema', 'Comentario', 'Contacto', 'Imágenes']);
  }
  return sh;
}

function getFolder_() {
  const it = DriveApp.getFoldersByName(CONFIG.FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(CONFIG.FOLDER_NAME);
}
```

## Alternativa local (sin Google)

Si corrés la app con `iniciar_app.bat`, el servidor FastAPI ya tiene el endpoint `POST /api/feedback`:
guarda cada comentario en `feedback/<fecha>_<id>/` (un `feedback.json` y las imágenes). Esa carpeta está
en `.gitignore`. Con la app en GitHub Pages ese endpoint no existe: usá Apps Script.

## Anti-spam (una opinión cada 30 minutos)

Tres capas, de más suave a más firme:

1. **Navegador:** al enviar, se guarda la hora en `localStorage`; el botón queda bloqueado con cuenta regresiva
   (`FEEDBACK_COOLDOWN_MIN` en `static/js/config.js`).
2. **Servidor / Apps Script:** el formulario manda un **id anónimo** del navegador (`aa_cliente_id`, un UUID al azar, no es un dato personal).
   El script (o `POST /api/feedback` en el servidor local, que además mira la IP) rechaza un segundo envío del mismo id
   antes de 30 min y responde con cuánto falta.
3. **Tope global** en el script: máximo `MAX_POR_HORA` opiniones por hora en total.

Límites honestos: quien borre los datos del navegador obtiene un id nuevo y puede saltarse las capas 1 y 2.
Por eso existe el tope global y el campo trampa (honeypot). `CacheService` es "mejor esfuerzo" (Google puede vaciarlo antes).
Si algún día hay abuso real, el paso siguiente es un CAPTCHA (reCAPTCHA / Cloudflare Turnstile).

## Privacidad

- Avisá a quienes usan la app que **no incluyan datos personales** en las capturas (ya figura en el formulario).
- El campo de contacto es opcional.
- La carpeta de Drive y la planilla son privadas (solo tu cuenta).
