// utils/quiz.js — componente reutilizable de autoevaluación.

import { el, typeset } from './dom.js';

/**
 * Construye un quiz de opción múltiple.
 * @param {Array} questions [{ q, options:[...], answer:index, explain }]
 * @returns {HTMLElement}
 */
export function buildQuiz(questions, { title = 'Autoevaluación' } = {}) {
  const root = el('div', { class: 'card' });
  root.appendChild(el('h3', { text: title, style: 'margin-top:0;' }));

  const scoreEl = el('div', { class: 'quiz-score' });
  const answered = new Array(questions.length).fill(false);
  let correct = 0;

  function updateScore() {
    const done = answered.filter(Boolean).length;
    scoreEl.innerHTML = `Puntaje: <strong>${correct}</strong> / ${questions.length} `
      + `<span style="color:var(--text-dim)">(${done} respondidas)</span>`;
  }

  questions.forEach((item, qi) => {
    const qWrap = el('div', { class: 'quiz-q' });
    qWrap.appendChild(el('div', { html: `<strong>${qi + 1}.</strong> ${item.q}` }));
    const opts = el('div', { class: 'quiz-opts' });
    const feedback = el('div', { class: 'quiz-feedback', style: 'display:none;' });

    item.options.forEach((optText, oi) => {
      const btn = el('button', { class: 'quiz-opt', html: optText });
      btn.addEventListener('click', () => {
        if (answered[qi]) return;
        answered[qi] = true;
        const isCorrect = oi === item.answer;
        if (isCorrect) correct += 1;
        // marcar
        [...opts.children].forEach((c, ci) => {
          c.disabled = true;
          if (ci === item.answer) c.classList.add('correct');
          if (ci === oi && !isCorrect) c.classList.add('wrong');
        });
        feedback.className = 'quiz-feedback ' + (isCorrect ? 'ok' : 'no');
        feedback.style.display = 'block';
        feedback.innerHTML = (isCorrect ? '✓ Correcto. ' : '✗ No exactamente. ')
          + (item.explain || '');
        updateScore();
        typeset(feedback);
      });
      opts.appendChild(btn);
    });

    qWrap.appendChild(opts);
    qWrap.appendChild(feedback);
    root.appendChild(qWrap);
  });

  root.appendChild(scoreEl);
  updateScore();
  return root;
}
