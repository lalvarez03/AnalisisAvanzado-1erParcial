// materias/alc/lib.js — álgebra lineal numérica mínima para las visualizaciones de ALC.
// Matrices = arrays de filas (A[i][j]). Todo O(n^3) como máximo, con n ≤ 6 en las páginas.

export const fmt = (x, d = 3) => {
  if (!Number.isFinite(x)) return x > 0 ? '∞' : x < 0 ? '−∞' : 'NaN';
  const r = Math.abs(x) < 5 * Math.pow(10, -d - 1) ? 0 : x;
  return r.toFixed(d).replace('-', '−');
};

export const matStr = (M, d = 2) => M.map((f) => '[ ' + f.map((x) => fmt(x, d).padStart(7)).join(' ') + ' ]').join('\n');

export const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
export const T = (A) => A[0].map((_, j) => A.map((f) => f[j]));
export const mul = (A, B) => A.map((f) => B[0].map((_, j) => f.reduce((s, a, k) => s + a * B[k][j], 0)));
export const mulv = (A, v) => A.map((f) => f.reduce((s, a, k) => s + a * v[k], 0));
export const dot = (u, v) => u.reduce((s, a, i) => s + a * v[i], 0);
export const norm2 = (v) => Math.sqrt(dot(v, v));
export const norm1 = (v) => v.reduce((s, a) => s + Math.abs(a), 0);
export const normInf = (v) => Math.max(...v.map(Math.abs));
/** Norma matricial inducida 1 (máx suma de columnas) e ∞ (máx suma de filas). */
export const matNorm1 = (A) => Math.max(...T(A).map(norm1));
export const matNormInf = (A) => Math.max(...A.map(norm1));

/** Determinante por eliminación con pivoteo parcial. O(n^3). */
export function det(A) {
  const n = A.length; const M = A.map((f) => f.slice()); let d = 1;
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[p][k])) p = i;
    if (Math.abs(M[p][k]) < 1e-14) return 0;
    if (p !== k) { [M[p], M[k]] = [M[k], M[p]]; d = -d; }
    d *= M[k][k];
    for (let i = k + 1; i < n; i++) { const m = M[i][k] / M[k][k]; for (let j = k; j < n; j++) M[i][j] -= m * M[k][j]; }
  }
  return d;
}

/** Resuelve Ax=b con pivoteo parcial. Devuelve null si A es singular. O(n^3). */
export function solve(A, b) {
  const n = A.length; const M = A.map((f, i) => [...f, b[i]]);
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[p][k])) p = i;
    if (Math.abs(M[p][k]) < 1e-14) return null;
    [M[p], M[k]] = [M[k], M[p]];
    for (let i = k + 1; i < n; i++) { const m = M[i][k] / M[k][k]; for (let j = k; j <= n; j++) M[i][j] -= m * M[k][j]; }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j]; x[i] = s / M[i][i]; }
  return x;
}

export function inv(A) {
  const n = A.length; const cols = [];
  for (let j = 0; j < n; j++) { const e = Array(n).fill(0); e[j] = 1; const c = solve(A, e); if (!c) return null; cols.push(c); }
  return T(cols);
}

/** LU sin pivoteo (L con unos en la diagonal). Devuelve null si aparece un pivote nulo. O(n^3). */
export function luSinPivoteo(A) {
  const n = A.length; const U = A.map((f) => f.slice()); const L = eye(n);
  for (let k = 0; k < n; k++) {
    if (Math.abs(U[k][k]) < 1e-12) return null;
    for (let i = k + 1; i < n; i++) { L[i][k] = U[i][k] / U[k][k]; for (let j = k; j < n; j++) U[i][j] -= L[i][k] * U[k][j]; U[i][k] = 0; }
  }
  return { L, U };
}

/** LU con pivoteo parcial: PA = LU. */
export function luPivoteo(A) {
  const n = A.length; const U = A.map((f) => f.slice()); const L = Array.from({ length: n }, () => Array(n).fill(0)); const perm = [...Array(n).keys()];
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(U[i][k]) > Math.abs(U[p][k])) p = i;
    if (p !== k) { [U[p], U[k]] = [U[k], U[p]]; [L[p], L[k]] = [L[k], L[p]]; [perm[p], perm[k]] = [perm[k], perm[p]]; }
    if (Math.abs(U[k][k]) < 1e-12) continue;
    for (let i = k + 1; i < n; i++) { L[i][k] = U[i][k] / U[k][k]; for (let j = k; j < n; j++) U[i][j] -= L[i][k] * U[k][j]; U[i][k] = 0; }
  }
  for (let i = 0; i < n; i++) L[i][i] = 1;
  return { L, U, perm };
}

/** Cholesky A = L L^t. Devuelve null si A no es definida positiva. O(n^3). */
export function cholesky(A) {
  const n = A.length; const L = Array.from({ length: n }, () => Array(n).fill(0));
  for (let j = 0; j < n; j++) {
    let s = A[j][j]; for (let k = 0; k < j; k++) s -= L[j][k] ** 2;
    if (s <= 1e-12) return null;
    L[j][j] = Math.sqrt(s);
    for (let i = j + 1; i < n; i++) { let t = A[i][j]; for (let k = 0; k < j; k++) t -= L[i][k] * L[j][k]; L[i][j] = t / L[j][j]; }
  }
  return L;
}

/** Autovalores (y autovectores reales) de una matriz 2x2 real [[a,b],[c,d]]. */
export function eig2([[a, b], [c, d]]) {
  const tr = a + d; const dt = a * d - b * c; const disc = tr * tr / 4 - dt;
  if (disc < -1e-12) return { complejo: true, re: tr / 2, im: Math.sqrt(-disc), tr, dt };
  const s = Math.sqrt(Math.max(0, disc)); const l1 = tr / 2 + s; const l2 = tr / 2 - s;
  const vec = (l) => {
    let v;
    if (Math.abs(b) > 1e-12) v = [b, l - a]; else if (Math.abs(c) > 1e-12) v = [l - d, c]; else v = Math.abs(l - a) < 1e-12 ? [1, 0] : [0, 1];
    const n = norm2(v); return [v[0] / n, v[1] / n];
  };
  return { complejo: false, l1, l2, v1: vec(l1), v2: vec(l2), tr, dt, repetido: s < 1e-9 };
}

/** SVD de una 2x2: A = U diag(s1,s2) V^t, con s1 ≥ s2 ≥ 0. */
export function svd2(A) {
  const S = mul(T(A), A); const p = S[0][0]; const q = S[0][1]; const r = S[1][1];
  const th = 0.5 * Math.atan2(2 * q, p - r);
  const v1 = [Math.cos(th), Math.sin(th)]; const v2 = [-Math.sin(th), Math.cos(th)];
  const s1 = norm2(mulv(A, v1)); const s2 = norm2(mulv(A, v2));
  const u1 = s1 > 1e-12 ? mulv(A, v1).map((x) => x / s1) : [1, 0];
  const u2 = s2 > 1e-12 ? mulv(A, v2).map((x) => x / s2) : [-u1[1], u1[0]];
  return { s1, s2, u1, u2, v1, v2 };
}

/** Gram-Schmidt clásico sobre las columnas de A (n×p). Devuelve Q (n×p) y R (p×p). */
export function qrGS(A) {
  const n = A.length; const p = A[0].length; const cols = T(A); const Q = []; const R = Array.from({ length: p }, () => Array(p).fill(0));
  for (let j = 0; j < p; j++) {
    let v = cols[j].slice();
    for (let i = 0; i < Q.length; i++) { R[i][j] = dot(Q[i], cols[j]); v = v.map((x, k) => x - R[i][j] * Q[i][k]); }
    R[j][j] = norm2(v); Q.push(R[j][j] > 1e-12 ? v.map((x) => x / R[j][j]) : v);
  }
  return { Q: T(Q), R, n };
}

/** Radio espectral de una matriz n×n (por iteración de potencia sobre |A|, suficiente para las demos 2x2/3x3). */
export function radioEspectral2(A) {
  const e = eig2(A);
  return e.complejo ? Math.hypot(e.re, e.im) : Math.max(Math.abs(e.l1), Math.abs(e.l2));
}

/** Ajusta la vista del plano para que haya la misma escala en x e y (círculos son círculos). */
export function vistaIgual(plane, R, cx = 0, cy = 0) {
  const k = plane.width / Math.max(1, plane.height);
  plane.view.xmin = cx - R * k; plane.view.xmax = cx + R * k; plane.view.ymin = cy - R; plane.view.ymax = cy + R;
}

export function poligonal(plane, pts, color, w = 2, dash = null) {
  for (let i = 0; i + 1 < pts.length; i++) plane.segment(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], color, w, dash);
}

/** Flecha desde (x0,y0) hasta (x1,y1) en coordenadas del mundo. */
export function flecha(plane, x0, y0, x1, y1, color, w = 2.5) {
  plane.segment(x0, y0, x1, y1, color, w);
  const ang = Math.atan2(y1 - y0, x1 - x0); const hx = (plane.view.xmax - plane.view.xmin) * 0.02;
  for (const s of [-1, 1]) plane.segment(x1, y1, x1 - hx * Math.cos(ang + s * 0.45) * 1.6, y1 - hx * Math.sin(ang + s * 0.45) * 1.6, color, w);
}

/** Elipse imagen de la circunferencia unitaria por A (2x2). */
export function imagenCirculo(A, n = 120) {
  return Array.from({ length: n + 1 }, (_, i) => { const t = (2 * Math.PI * i) / n; return mulv(A, [Math.cos(t), Math.sin(t)]); });
}

/**
 * SVD por Jacobi unilateral (Hestenes) de A (m×n, m ≥ n). Devuelve {U (m×n), s (n, decreciente), V (n×n)} con A = U diag(s) V^t.
 * Complejidad: O(n^2 m) por barrida, ~10 barridas; suficiente para matrices de decenas de filas.
 */
export function svdJacobi(A) {
  const m = A.length; const n = A[0].length;
  const U = A.map((f) => f.slice()); const V = eye(n);
  for (let sweep = 0; sweep < 40; sweep++) {
    let off = 0;
    for (let p = 0; p < n - 1; p++) {
      for (let q = p + 1; q < n; q++) {
        let al = 0; let be = 0; let ga = 0;
        for (let i = 0; i < m; i++) { al += U[i][p] ** 2; be += U[i][q] ** 2; ga += U[i][p] * U[i][q]; }
        if (Math.abs(ga) < 1e-14 * Math.sqrt(al * be) || ga === 0) continue;
        off = Math.max(off, Math.abs(ga) / Math.sqrt(al * be));
        const z = (be - al) / (2 * ga); const t = Math.sign(z || 1) / (Math.abs(z) + Math.sqrt(1 + z * z));
        const c = 1 / Math.sqrt(1 + t * t); const s = c * t;
        for (let i = 0; i < m; i++) { const a = U[i][p]; const b = U[i][q]; U[i][p] = c * a - s * b; U[i][q] = s * a + c * b; }
        for (let i = 0; i < n; i++) { const a = V[i][p]; const b = V[i][q]; V[i][p] = c * a - s * b; V[i][q] = s * a + c * b; }
      }
    }
    if (off < 1e-13) break;
  }
  const sv = Array.from({ length: n }, (_, j) => Math.sqrt(U.reduce((s, f) => s + f[j] ** 2, 0)));
  const orden = [...sv.keys()].sort((a, b) => sv[b] - sv[a]);
  return {
    s: orden.map((j) => sv[j]),
    U: U.map((f) => orden.map((j) => (sv[j] > 1e-14 ? f[j] / sv[j] : 0))),
    V: V.map((f) => orden.map((j) => f[j])),
  };
}
