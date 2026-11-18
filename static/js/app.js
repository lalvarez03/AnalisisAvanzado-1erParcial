// app.js — entry point. Arranca la capa superior (menú de materias + router) y el Pomodoro.
// Las materias se cargan bajo demanda desde static/materias/registry.js.

import { initNavigation } from './navigation.js';
import { initPomodoro } from './pomodoro.js';

initNavigation();
initPomodoro();
