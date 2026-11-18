// check_imports.cjs — verifica que todos los imports nombrados (relativos) de los
// módulos ES resuelvan a exports reales. Detecta la clase de bug "does not provide
// an export named X". Uso: node check_imports.cjs [ruta_base]
const fs = require('fs');
const path = require('path');

const base = path.resolve(process.argv[2] || 'static/js');

function listJs(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(listJs(p));
    else if (e.name.endsWith('.js')) out.push(p);
  }
  return out;
}

// Exportaciones de un archivo: busca patrones export. (No es un parser completo,
// pero alcanza para el estilo de este proyecto.)
function exportsOf(file) {
  const src = fs.readFileSync(file, 'utf8');
  const names = new Set();
  // export function NAME / export const NAME / export let NAME / export class NAME
  const re1 = /\bexport\s+(?:async\s+)?(?:function|const|let|var|class)\s+([A-Za-z_$][\w$]*)/g;
  let m;
  while ((m = re1.exec(src))) names.add(m[1]);
  // export { a, b as c, d }
  const re2 = /\bexport\s*\{([^}]*)\}/g;
  while ((m = re2.exec(src))) {
    for (let part of m[1].split(',')) {
      part = part.trim();
      if (!part) continue;
      // "a as b" -> exported name is "b"; "a" -> "a"
      const as = part.match(/^(\w+)\s+as\s+(\w+)$/);
      names.add(as ? as[2] : part.split(/\s+/)[0]);
    }
  }
  // export default
  if (/\bexport\s+default\b/.test(src)) names.add('default');
  return names;
}

// imports nombrados relativos: import { a, b as c } from './x.js'
function importsOf(file) {
  const src = fs.readFileSync(file, 'utf8');
  const out = [];
  const re = /\bimport\s*(?:type\s*)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(src))) {
    const from = m[2];
    if (!from.startsWith('.')) continue; // sólo relativos (CDN/externos se ignoran)
    const names = [];
    for (let part of m[1].split(',')) {
      part = part.trim();
      if (!part) continue;
      const as = part.match(/^(\w+)\s+as\s+(\w+)$/);
      names.push({ local: as ? as[2] : part.split(/\s+/)[0], orig: part.split(/\s+/)[0] });
    }
    out.push({ from, names, line: src.slice(0, m.index).split('\n').length });
  }
  // imports por defecto relativos: import x from './x.js'
  const reDef = /\bimport\s+([A-Za-z_$][\w$]*)\s*,?\s*(?:\{[^}]*\}\s*,?)?\s*from\s*['"]([^'"]+)['"]/g;
  return out;
}

let problems = 0;
const files = listJs(base);
for (const f of files) {
  const imps = importsOf(f);
  for (const imp of imps) {
    const target = path.resolve(path.dirname(f), imp.from);
    if (!fs.existsSync(target)) {
      console.log(`✗ ${path.relative(base, f)} -> NO EXISTE: ${imp.from}`);
      problems++;
      continue;
    }
    const exps = exportsOf(target);
    for (const n of imp.names) {
      if (!exps.has(n.orig)) {
        console.log(`✗ ${path.relative(base, f)}:${imp.line} -> "${imp.from}" no exporta "${n.orig}"`);
        problems++;
      }
    }
  }
}
console.log(problems === 0 ? '\n✔ Todos los imports nombrados resuelven correctamente.' : `\n✗ ${problems} problema(s) encontrado(s).`);
process.exit(problems === 0 ? 0 : 1);
