// Meu Treino - PWA Offline App
// Gerenciamento de exercícios, rotinas semanais, execução de treino com cronômetros e histórico

// --- 1. DADOS INICIAIS (SEED) ---
const DEFAULT_EXERCISES = [
  // Peito
  { id: 'ex-1', name: 'Supino Reto', muscle: 'Peito', equipment: 'Barra e Banco', notes: 'Manter escápulas aduzidas e pés firmes no chão' },
  { id: 'ex-2', name: 'Supino Inclinado', muscle: 'Peito', equipment: 'Halteres e Banco 30º', notes: 'Foco na porção superior do peitoral' },
  { id: 'ex-3', name: 'Crucifixo / Peck Deck', muscle: 'Peito', equipment: 'Máquina', notes: 'Movimento controlado, sem bater os pesos' },
  { id: 'ex-4', name: 'Crossover', muscle: 'Peito', equipment: 'Polia Alta', notes: 'Manter leve flexão dos cotovelos' },
  
  // Costas
  { id: 'ex-5', name: 'Puxada Alta (Pulldown)', muscle: 'Costas', equipment: 'Polia', notes: 'Puxar em direção ao peito, não atrás do pescoço' },
  { id: 'ex-6', name: 'Remada Baixa (Triângulo)', muscle: 'Costas', equipment: 'Polia / Máquina', notes: 'Tronco firme, estufar o peito na puxada' },
  { id: 'ex-7', name: 'Remada Curvada', muscle: 'Costas', equipment: 'Barra', notes: 'Coluna ereta, puxar na linha do umbigo' },
  
  // Pernas
  { id: 'ex-8', name: 'Agachamento Livre', muscle: 'Pernas', equipment: 'Barra Olímpica', notes: 'Descer até pelo menos 90 graus' },
  { id: 'ex-9', name: 'Leg Press 45º', muscle: 'Pernas', equipment: 'Máquina', notes: 'Não hiperestender os joelhos no topo' },
  { id: 'ex-10', name: 'Cadeira Extensora', muscle: 'Pernas', equipment: 'Máquina', notes: 'Segurar 1 segundo no pico de contração' },
  { id: 'ex-11', name: 'Mesa Flexora', muscle: 'Pernas', equipment: 'Máquina', notes: 'Foco na parte posterior da coxa' },
  { id: 'ex-12', name: 'Elevação de Panturrilha', muscle: 'Pernas', equipment: 'Máquina / Degrau', notes: 'Amplitude total' },

  // Ombros
  { id: 'ex-13', name: 'Desenvolvimento', muscle: 'Ombros', equipment: 'Halteres e Banco', notes: 'Cuidado para não arquear a lombar' },
  { id: 'ex-14', name: 'Elevação Lateral', muscle: 'Ombros', equipment: 'Halteres', notes: 'Elevar até a altura do ombro' },
  { id: 'ex-15', name: 'Elevação Frontal', muscle: 'Ombros', equipment: 'Polia ou Halteres', notes: 'Movimento cadenciado' },

  // Braços
  { id: 'ex-16', name: 'Rosca Direta', muscle: 'Bíceps', equipment: 'Barra W', notes: 'Cotovelos colados ao corpo' },
  { id: 'ex-17', name: 'Rosca Martelo', muscle: 'Bíceps', equipment: 'Halteres', notes: 'Pegada neutra' },
  { id: 'ex-18', name: 'Tríceps Corda', muscle: 'Tríceps', equipment: 'Polia Alta', notes: 'Abrir a corda no final do movimento' },
  { id: 'ex-19', name: 'Tríceps Francês', muscle: 'Tríceps', equipment: 'Halter', notes: 'Cotovelos apontando para o teto' },

  // Abdômen
  { id: 'ex-20', name: 'Abdominal Crunch', muscle: 'Abdômen', equipment: 'Colchonete', notes: 'Contrair bem o abdômen' },
  { id: 'ex-21', name: 'Prancha Isométrica', muscle: 'Abdômen', equipment: 'Colchonete', notes: 'Corpo em linha reta' }
];

const DEFAULT_ROUTINES = {
  seg: {
    name: 'Peito e Tríceps',
    focus: 'Peitoral completo e tríceps',
    items: [
      { exerciseId: 'ex-1', sets: 4, reps: 10, weight: 40 },
      { exerciseId: 'ex-2', sets: 4, reps: 10, weight: 16 },
      { exerciseId: 'ex-3', sets: 3, reps: 12, weight: 35 },
      { exerciseId: 'ex-18', sets: 4, reps: 12, weight: 20 },
      { exerciseId: 'ex-19', sets: 3, reps: 10, weight: 12 }
    ]
  },
  ter: {
    name: 'Costas e Bíceps',
    focus: 'Dorsal e flexores do braço',
    items: [
      { exerciseId: 'ex-5', sets: 4, reps: 10, weight: 45 },
      { exerciseId: 'ex-6', sets: 4, reps: 10, weight: 40 },
      { exerciseId: 'ex-7', sets: 3, reps: 10, weight: 30 },
      { exerciseId: 'ex-16', sets: 4, reps: 10, weight: 15 },
      { exerciseId: 'ex-17', sets: 3, reps: 12, weight: 12 }
    ]
  },
  qua: {
    name: 'Pernas e Abdômen',
    focus: 'Quadríceps, posterior e core',
    items: [
      { exerciseId: 'ex-8', sets: 4, reps: 10, weight: 50 },
      { exerciseId: 'ex-9', sets: 4, reps: 12, weight: 120 },
      { exerciseId: 'ex-10', sets: 3, reps: 12, weight: 40 },
      { exerciseId: 'ex-11', sets: 3, reps: 12, weight: 35 },
      { exerciseId: 'ex-12', sets: 4, reps: 15, weight: 50 },
      { exerciseId: 'ex-20', sets: 3, reps: 20, weight: 0 }
    ]
  },
  qui: {
    name: 'Ombros e Trapézio',
    focus: 'Deltoides anterior, lateral e posterior',
    items: [
      { exerciseId: 'ex-13', sets: 4, reps: 10, weight: 14 },
      { exerciseId: 'ex-14', sets: 4, reps: 12, weight: 8 },
      { exerciseId: 'ex-15', sets: 3, reps: 12, weight: 10 },
      { exerciseId: 'ex-21', sets: 3, reps: 45, weight: 0 }
    ]
  },
  sex: {
    name: 'Superiores e Braços',
    focus: 'Volume e intensidade',
    items: [
      { exerciseId: 'ex-1', sets: 3, reps: 10, weight: 40 },
      { exerciseId: 'ex-5', sets: 3, reps: 10, weight: 45 },
      { exerciseId: 'ex-14', sets: 3, reps: 12, weight: 8 },
      { exerciseId: 'ex-16', sets: 3, reps: 10, weight: 15 },
      { exerciseId: 'ex-18', sets: 3, reps: 12, weight: 20 }
    ]
  },
  sab: {
    name: 'Cardio / Descanso Ativo',
    focus: 'Caminhada, corrida ou descanso',
    items: []
  },
  dom: {
    name: 'Descanso Total',
    focus: 'Recuperação muscular',
    items: []
  }
};

const DAY_KEYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
const DAY_LABELS = {
  dom: 'Domingo',
  seg: 'Segunda-feira',
  ter: 'Terça-feira',
  qua: 'Quarta-feira',
  qui: 'Quinta-feira',
  sex: 'Sexta-feira',
  sab: 'Sábado'
};

// --- 2. ESTADO GLOBAL DA APLICAÇÃO ---
let state = {
  exercises: [],
  routines: {},
  history: [],
  settings: { goalMinutes: 60 },
  activeDay: 'seg', // Dia selecionado no editor de rotinas
  activeWorkout: null // Treino em andamento se houver
};

// Timers de Execução
let workoutTotalInterval = null;
let exerciseTimerInterval = null;
let restCountdownInterval = null;

// Áudio para alerta do descanso
let audioCtx = null;
function playBeep() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // Tom agudo agradável
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);

    // Vibração no celular
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  } catch (e) {
    console.log('Audio feedback not available');
  }
}

// --- 3. PERSISTÊNCIA LOCAL (LOCALSTORAGE) ---
function loadData() {
  try {
    const rawEx = localStorage.getItem('mt_exercises');
    state.exercises = rawEx ? JSON.parse(rawEx) : DEFAULT_EXERCISES;

    const rawRoutines = localStorage.getItem('mt_routines');
    state.routines = rawRoutines ? JSON.parse(rawRoutines) : DEFAULT_ROUTINES;

    const rawHistory = localStorage.getItem('mt_history');
    state.history = rawHistory ? JSON.parse(rawHistory) : [];

    const rawSettings = localStorage.getItem('mt_settings');
    state.settings = rawSettings ? JSON.parse(rawSettings) : { goalMinutes: 60 };

    const rawActiveWorkout = localStorage.getItem('mt_active_workout');
    state.activeWorkout = rawActiveWorkout ? JSON.parse(rawActiveWorkout) : null;
  } catch (e) {
    console.error('Erro ao ler localStorage, usando padrões', e);
    state.exercises = DEFAULT_EXERCISES;
    state.routines = DEFAULT_ROUTINES;
    state.history = [];
    state.settings = { goalMinutes: 60 };
  }
}

function saveExercises() {
  localStorage.setItem('mt_exercises', JSON.stringify(state.exercises));
}

function saveRoutines() {
  localStorage.setItem('mt_routines', JSON.stringify(state.routines));
}

function saveHistory() {
  localStorage.setItem('mt_history', JSON.stringify(state.history));
}

function saveSettings() {
  localStorage.setItem('mt_settings', JSON.stringify(state.settings));
}

function saveActiveWorkoutState() {
  if (state.activeWorkout) {
    localStorage.setItem('mt_active_workout', JSON.stringify(state.activeWorkout));
  } else {
    localStorage.removeItem('mt_active_workout');
  }
}

// Formatação de Tempo
function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Obter chave do dia de hoje (ex: 'seg')
function getTodayKey() {
  const d = new Date();
  return DAY_KEYS[d.getDay()];
}

// --- 4. INICIALIZAÇÃO DA INTERFACE ---
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupNavigation();
  setupTodayTab();
  setupRoutinesTab();
  setupExercisesTab();
  setupHistoryTab();
  setupSettingsTab();
  setupModals();
  setupServiceWorker();

  // Se já havia um treino em andamento recarregar
  if (state.activeWorkout) {
    resumeActiveWorkout();
  }
});

// PWA Service Worker
function setupServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service Worker registrado com sucesso (PWA offline ativo).'))
      .catch((err) => console.log('Falha ao registrar Service Worker:', err));
  }

  // Monitorar status online/offline
  const statusBadge = document.getElementById('offline-status');
  function updateOnlineStatus() {
    if (navigator.onLine) {
      statusBadge.textContent = 'App Pronto';
      statusBadge.style.color = '#00e676';
    } else {
      statusBadge.textContent = 'Offline (100%)';
      statusBadge.style.color = '#ff9100';
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
}

// Navegação por Abas
function setupNavigation() {
  const navButtons = document.querySelectorAll('.bottom-nav .nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      
      navButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');

      // Se navegou para o histórico ou catálogo atualizar lista
      if (targetId === 'tab-history') renderHistoryList();
      if (targetId === 'tab-exercises') renderExercisesCatalog();
      if (targetId === 'tab-routines') renderRoutineEditor();
    });
  });
}

// --- 5. ABA HOJE & EXECUÇÃO DO TREINO ---
let currentSessionDayKey = null;

function setupTodayTab() {
  const todayKey = getTodayKey();
  currentSessionDayKey = todayKey;

  // Atualizar cabeçalho da data
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = new Date().toLocaleDateString('pt-BR', dateOptions);
  document.getElementById('current-date-display').textContent = formattedDate;

  // Atualizar meta diária exibida
  document.getElementById('display-goal-time').textContent = `${state.settings.goalMinutes} minutos`;

  renderTodayPreview(todayKey);

  // Botão Iniciar Treino
  document.getElementById('btn-start-workout').addEventListener('click', () => {
    startWorkoutSession(currentSessionDayKey);
  });

  // Botão Trocar Dia do Treino
  document.getElementById('btn-switch-day').addEventListener('click', () => {
    openSwitchDayModal();
  });

  // Controles do Treino Ativo
  document.getElementById('btn-next-exercise').addEventListener('click', nextExercise);
  document.getElementById('btn-prev-exercise').addEventListener('click', prevExercise);
  document.getElementById('btn-finish-workout-early').addEventListener('click', () => {
    if (confirm('Deseja realmente finalizar o treino agora?')) {
      finishWorkoutSession();
    }
  });

  // Presets de Descanso
  document.querySelectorAll('.btn-rest').forEach(btn => {
    btn.addEventListener('click', () => {
      const seconds = parseInt(btn.getAttribute('data-seconds'), 10);
      startRestTimer(seconds);
    });
  });

  document.getElementById('btn-stop-rest').addEventListener('click', stopRestTimer);

  // Botão Voltar para Início pós conclusão
  document.getElementById('btn-back-to-home').addEventListener('click', () => {
    document.getElementById('today-finished-workout').classList.add('hidden');
    document.getElementById('today-pre-workout').classList.remove('hidden');
    renderTodayPreview(getTodayKey());
  });
}

function renderTodayPreview(dayKey) {
  const routine = state.routines[dayKey] || { name: 'Sem treino', items: [] };
  document.getElementById('today-day-tag').textContent = DAY_LABELS[dayKey].toUpperCase();
  document.getElementById('today-workout-title').textContent = routine.name;
  document.getElementById('today-workout-desc').textContent = routine.focus || 'Pronto para treinar hoje?';

  const previewBox = document.getElementById('today-workout-preview');
  previewBox.innerHTML = '';

  if (!routine.items || routine.items.length === 0) {
    previewBox.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 10px 0;">
      Nenhum exercício cadastrado para ${DAY_LABELS[dayKey]}. Você pode descansar ou escolher outro dia!
    </p>`;
    return;
  }

  routine.items.forEach((item, idx) => {
    const ex = state.exercises.find(e => e.id === item.exerciseId);
    if (!ex) return;
    const div = document.createElement('div');
    div.className = 'preview-ex-item';
    div.innerHTML = `
      <div class="preview-ex-name">${idx + 1}. ${ex.name}</div>
      <div class="preview-ex-detail">${item.sets}x${item.reps} • ${item.weight}kg</div>
    `;
    previewBox.appendChild(div);
  });
}

// Iniciar Sessão de Treino
function startWorkoutSession(dayKey) {
  const routine = state.routines[dayKey];
  if (!routine || !routine.items || routine.items.length === 0) {
    alert('Esta rotina não tem exercícios cadastrados! Vá na aba Rotinas para montar o treino.');
    return;
  }

  // Inicializar estado do treino ativo
  state.activeWorkout = {
    dayKey: dayKey,
    routineName: routine.name,
    startTime: Date.now(),
    totalElapsedSeconds: 0,
    currentExerciseIndex: 0,
    exercisesData: routine.items.map(item => {
      const ex = state.exercises.find(e => e.id === item.exerciseId) || {};
      return {
        exerciseId: item.exerciseId,
        exerciseName: ex.name || 'Exercício',
        muscle: ex.muscle || '',
        equipment: ex.equipment || '',
        setsConfig: item.sets,
        targetReps: item.reps,
        targetWeight: item.weight,
        elapsedSeconds: 0,
        setsDone: Array.from({ length: item.sets }, () => ({
          completed: false,
          reps: item.reps,
          weight: item.weight
        }))
      };
    })
  };

  saveActiveWorkoutState();

  // Trocar telas
  document.getElementById('today-pre-workout').classList.add('hidden');
  document.getElementById('today-finished-workout').classList.add('hidden');
  document.getElementById('today-active-workout').classList.remove('hidden');

  startTimers();
  renderCurrentExerciseStep();
}

function resumeActiveWorkout() {
  document.getElementById('today-pre-workout').classList.add('hidden');
  document.getElementById('today-finished-workout').classList.add('hidden');
  document.getElementById('today-active-workout').classList.remove('hidden');

  startTimers();
  renderCurrentExerciseStep();
}

// Iniciar Cronômetros
function startTimers() {
  clearInterval(workoutTotalInterval);
  clearInterval(exerciseTimerInterval);

  workoutTotalInterval = setInterval(() => {
    if (!state.activeWorkout) return;
    state.activeWorkout.totalElapsedSeconds++;
    updateTotalTimerDisplay();
    saveActiveWorkoutState();
  }, 1000);

  exerciseTimerInterval = setInterval(() => {
    if (!state.activeWorkout) return;
    const curIdx = state.activeWorkout.currentExerciseIndex;
    if (state.activeWorkout.exercisesData[curIdx]) {
      state.activeWorkout.exercisesData[curIdx].elapsedSeconds++;
      updateExerciseTimerDisplay();
    }
  }, 1000);

  updateTotalTimerDisplay();
  updateExerciseTimerDisplay();
}

function updateTotalTimerDisplay() {
  if (!state.activeWorkout) return;
  const secs = state.activeWorkout.totalElapsedSeconds;
  document.getElementById('live-total-timer').textContent = formatTime(secs);

  // Meta de progresso
  const goalSecs = (state.settings.goalMinutes || 60) * 60;
  const pct = Math.min(100, Math.round((secs / goalSecs) * 100));
  document.getElementById('goal-progress-bar').style.width = `${pct}%`;
  document.getElementById('goal-progress-text').textContent = `${Math.floor(secs / 60)} de ${state.settings.goalMinutes} min (${pct}%)`;
}

function updateExerciseTimerDisplay() {
  if (!state.activeWorkout) return;
  const curIdx = state.activeWorkout.currentExerciseIndex;
  const curEx = state.activeWorkout.exercisesData[curIdx];
  if (curEx) {
    document.getElementById('live-exercise-timer').textContent = formatTime(curEx.elapsedSeconds);
  }
}

// Renderizar o Exercício Atual da Sessão
function renderCurrentExerciseStep() {
  const workout = state.activeWorkout;
  if (!workout) return;

  const curIdx = workout.currentExerciseIndex;
  const totalEx = workout.exercisesData.length;
  const exData = workout.exercisesData[curIdx];

  document.getElementById('exercise-stepper-text').textContent = `Exercício ${curIdx + 1} de ${totalEx}`;
  document.getElementById('live-muscle-tag').textContent = exData.muscle;
  document.getElementById('live-exercise-name').textContent = exData.exerciseName;
  document.getElementById('live-equip-name').textContent = exData.equipment || 'Livre / Máquina';

  // Séries
  const setsList = document.getElementById('live-sets-list');
  setsList.innerHTML = '';

  exData.setsDone.forEach((set, sIdx) => {
    const row = document.createElement('div');
    row.className = `set-row ${set.completed ? 'completed' : ''}`;
    row.innerHTML = `
      <div class="set-num">#${sIdx + 1}</div>
      <div class="set-input-box">
        <input type="number" class="set-input set-reps-input" value="${set.reps}" data-idx="${sIdx}">
      </div>
      <div class="set-input-box">
        <input type="number" class="set-input set-weight-input" value="${set.weight}" data-idx="${sIdx}">
      </div>
      <div>
        <button class="set-btn-check" data-idx="${sIdx}">
          ${set.completed ? '✓ FEITO' : 'MARCAR'}
        </button>
      </div>
    `;

    // Atualização de repetições e peso na hora
    row.querySelector('.set-reps-input').addEventListener('change', (e) => {
      set.reps = parseFloat(e.target.value) || 0;
      saveActiveWorkoutState();
    });
    row.querySelector('.set-weight-input').addEventListener('change', (e) => {
      set.weight = parseFloat(e.target.value) || 0;
      saveActiveWorkoutState();
    });

    // Checkbox de conclusão da série
    row.querySelector('.set-btn-check').addEventListener('click', () => {
      set.completed = !set.completed;
      row.classList.toggle('completed', set.completed);
      row.querySelector('.set-btn-check').textContent = set.completed ? '✓ FEITO' : 'MARCAR';
      saveActiveWorkoutState();

      // Inicia descanso automático de 60s ao marcar como feito!
      if (set.completed) {
        startRestTimer(60);
      }
    });

    setsList.appendChild(row);
  });

  // Botões de navegação
  const btnPrev = document.getElementById('btn-prev-exercise');
  const btnNext = document.getElementById('btn-next-exercise');

  btnPrev.disabled = curIdx === 0;
  btnPrev.style.opacity = curIdx === 0 ? '0.4' : '1';

  if (curIdx === totalEx - 1) {
    btnNext.innerHTML = '🏁 Concluir Treino!';
  } else {
    btnNext.innerHTML = 'Concluir & Próximo ➡️';
  }

  updateExerciseTimerDisplay();
}

function nextExercise() {
  if (!state.activeWorkout) return;
  const curIdx = state.activeWorkout.currentExerciseIndex;
  const totalEx = state.activeWorkout.exercisesData.length;

  if (curIdx < totalEx - 1) {
    state.activeWorkout.currentExerciseIndex++;
    saveActiveWorkoutState();
    renderCurrentExerciseStep();
  } else {
    finishWorkoutSession();
  }
}

function prevExercise() {
  if (!state.activeWorkout) return;
  if (state.activeWorkout.currentExerciseIndex > 0) {
    state.activeWorkout.currentExerciseIndex--;
    saveActiveWorkoutState();
    renderCurrentExerciseStep();
  }
}

// Timer de Descanso
let restTimeRemaining = 0;
function startRestTimer(seconds) {
  clearInterval(restCountdownInterval);
  restTimeRemaining = seconds;
  updateRestDisplay();

  restCountdownInterval = setInterval(() => {
    restTimeRemaining--;
    if (restTimeRemaining <= 0) {
      clearInterval(restCountdownInterval);
      playBeep();
      document.getElementById('rest-timer-display').textContent = 'Hora de treinar!';
    } else {
      updateRestDisplay();
    }
  }, 1000);
}

function stopRestTimer() {
  clearInterval(restCountdownInterval);
  restTimeRemaining = 0;
  document.getElementById('rest-timer-display').textContent = '00:00';
}

function updateRestDisplay() {
  const m = Math.floor(restTimeRemaining / 60);
  const s = restTimeRemaining % 60;
  document.getElementById('rest-timer-display').textContent = 
    `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Conclusão do Treino
function finishWorkoutSession() {
  clearInterval(workoutTotalInterval);
  clearInterval(exerciseTimerInterval);
  clearInterval(restCountdownInterval);

  const workout = state.activeWorkout;
  if (!workout) return;

  const totalTimeSecs = workout.totalElapsedSeconds;
  let totalSetsCompleted = 0;
  workout.exercisesData.forEach(ex => {
    totalSetsCompleted += ex.setsDone.filter(s => s.completed).length;
  });

  // Salvar no Histórico Permanente
  const historyEntry = {
    id: 'h-' + Date.now(),
    date: new Date().toISOString(),
    dayKey: workout.dayKey,
    routineName: workout.routineName,
    totalSeconds: totalTimeSecs,
    totalSetsCompleted: totalSetsCompleted,
    exercises: workout.exercisesData.map(e => ({
      name: e.exerciseName,
      muscle: e.muscle,
      elapsedSeconds: e.elapsedSeconds,
      sets: e.setsDone.map(s => ({ reps: s.reps, weight: s.weight, completed: s.completed }))
    }))
  };

  state.history.unshift(historyEntry);
  saveHistory();

  // Limpar sessão ativa
  state.activeWorkout = null;
  saveActiveWorkoutState();

  // Exibir tela de comemoração / resumo
  document.getElementById('today-active-workout').classList.add('hidden');
  document.getElementById('today-finished-workout').classList.remove('hidden');

  document.getElementById('finish-total-time').textContent = formatTime(totalTimeSecs);
  document.getElementById('finish-exercises-count').textContent = workout.exercisesData.length;
  document.getElementById('finish-sets-count').textContent = totalSetsCompleted;

  const breakdownContainer = document.getElementById('finish-breakdown-list');
  breakdownContainer.innerHTML = '';
  workout.exercisesData.forEach(e => {
    const item = document.createElement('div');
    item.className = 'breakdown-item';
    item.innerHTML = `
      <span>${e.exerciseName} (${e.muscle})</span>
      <span class="breakdown-time">${formatTime(e.elapsedSeconds)}</span>
    `;
    breakdownContainer.appendChild(item);
  });
}

// Modal Trocar Treino de Hoje
function openSwitchDayModal() {
  const modal = document.getElementById('modal-switch-day');
  const container = document.getElementById('switch-day-options');
  container.innerHTML = '';

  DAY_KEYS.forEach(key => {
    const routine = state.routines[key];
    const card = document.createElement('div');
    card.className = 'switch-day-card';
    card.innerHTML = `
      <div>
        <div class="switch-day-name">${DAY_LABELS[key]}</div>
        <div class="switch-day-routine">${routine ? routine.name : 'Vazio'} • ${routine ? routine.items.length : 0} exercícios</div>
      </div>
      <button class="btn btn-small btn-primary">Escolher</button>
    `;
    card.addEventListener('click', () => {
      currentSessionDayKey = key;
      renderTodayPreview(key);
      modal.classList.add('hidden');
    });
    container.appendChild(card);
  });

  modal.classList.remove('hidden');
}

// --- 6. ABA ROTINAS SEMANAIS ---
function setupRoutinesTab() {
  const pills = document.querySelectorAll('.days-selector-pills .day-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeDay = pill.getAttribute('data-day');
      renderRoutineEditor();
    });
  });

  // Salvar Rotina
  document.getElementById('btn-save-routine').addEventListener('click', () => {
    saveCurrentDayRoutine();
  });

  // Adicionar exercício na rotina
  document.getElementById('btn-add-exercise-to-routine').addEventListener('click', () => {
    openExercisePickerModal();
  });
}

function renderRoutineEditor() {
  const routine = state.routines[state.activeDay] || { name: '', focus: '', items: [] };

  document.getElementById('routine-name-input').value = routine.name || '';
  document.getElementById('routine-focus-input').value = routine.focus || '';
  document.getElementById('routine-count').textContent = routine.items ? routine.items.length : 0;

  const container = document.getElementById('routine-items-container');
  container.innerHTML = '';

  if (!routine.items || routine.items.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">
      Nenhum exercício neste dia ainda. Clique em "+ Adicionar Exercício" acima!
    </p>`;
    return;
  }

  routine.items.forEach((item, index) => {
    const ex = state.exercises.find(e => e.id === item.exerciseId);
    if (!ex) return;

    const card = document.createElement('div');
    card.className = 'routine-item-card';
    card.innerHTML = `
      <div class="routine-item-top">
        <div>
          <div class="routine-item-name">${index + 1}. ${ex.name}</div>
          <div class="routine-item-equip">${ex.muscle} • ${ex.equipment}</div>
        </div>
        <button class="btn-remove-routine-item" title="Remover" data-idx="${index}">&times;</button>
      </div>
      <div class="routine-item-inputs">
        <div class="routine-mini-input">
          <label>Séries</label>
          <input type="number" min="1" max="20" value="${item.sets}" class="input-item-sets" data-idx="${index}">
        </div>
        <div class="routine-mini-input">
          <label>Reps</label>
          <input type="number" min="1" max="100" value="${item.reps}" class="input-item-reps" data-idx="${index}">
        </div>
        <div class="routine-mini-input">
          <label>Peso (kg)</label>
          <input type="number" min="0" max="500" step="0.5" value="${item.weight}" class="input-item-weight" data-idx="${index}">
        </div>
      </div>
    `;

    // Alteração dos inputs
    card.querySelector('.input-item-sets').addEventListener('input', (e) => {
      item.sets = parseInt(e.target.value, 10) || 1;
    });
    card.querySelector('.input-item-reps').addEventListener('input', (e) => {
      item.reps = parseInt(e.target.value, 10) || 1;
    });
    card.querySelector('.input-item-weight').addEventListener('input', (e) => {
      item.weight = parseFloat(e.target.value) || 0;
    });

    // Remover exercício
    card.querySelector('.btn-remove-routine-item').addEventListener('click', () => {
      routine.items.splice(index, 1);
      renderRoutineEditor();
    });

    container.appendChild(card);
  });
}

function saveCurrentDayRoutine() {
  const name = document.getElementById('routine-name-input').value.trim() || 'Treino';
  const focus = document.getElementById('routine-focus-input').value.trim();

  if (!state.routines[state.activeDay]) {
    state.routines[state.activeDay] = { items: [] };
  }

  state.routines[state.activeDay].name = name;
  state.routines[state.activeDay].focus = focus;

  saveRoutines();
  alert(`Rotina de ${DAY_LABELS[state.activeDay]} salva com sucesso!`);
  renderTodayPreview(getTodayKey());
}

// Modal Seletor de Exercícios para Rotina
function openExercisePickerModal() {
  const modal = document.getElementById('modal-select-exercise');
  const searchInput = document.getElementById('search-exercise-picker');
  searchInput.value = '';

  function renderPickerItems(filterText = '') {
    const list = document.getElementById('picker-exercises-list');
    list.innerHTML = '';
    const filtered = state.exercises.filter(ex => 
      ex.name.toLowerCase().includes(filterText.toLowerCase()) ||
      ex.muscle.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filtered.length === 0) {
      list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:15px;">Nenhum exercício encontrado.</p>`;
      return;
    }

    filtered.forEach(ex => {
      const item = document.createElement('div');
      item.className = 'picker-item';
      item.innerHTML = `
        <div>
          <div class="picker-title">${ex.name}</div>
          <div class="picker-subtitle">${ex.muscle} • ${ex.equipment}</div>
        </div>
        <span style="font-size: 18px; color: var(--primary);">+</span>
      `;
      item.addEventListener('click', () => {
        if (!state.routines[state.activeDay]) {
          state.routines[state.activeDay] = { name: 'Treino', items: [] };
        }
        state.routines[state.activeDay].items.push({
          exerciseId: ex.id,
          sets: 3,
          reps: 10,
          weight: 20
        });
        modal.classList.add('hidden');
        renderRoutineEditor();
      });
      list.appendChild(item);
    });
  }

  searchInput.oninput = (e) => renderPickerItems(e.target.value);
  renderPickerItems();
  modal.classList.remove('hidden');
}

// --- 7. ABA CATÁLOGO DE EXERCÍCIOS ---
let currentMuscleFilter = 'all';

function setupExercisesTab() {
  // Filtros de músculo
  const chips = document.querySelectorAll('#muscle-filter-chips .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentMuscleFilter = chip.getAttribute('data-muscle');
      renderExercisesCatalog();
    });
  });

  // Abrir Modal de Novo Exercício
  document.getElementById('btn-open-modal-exercise').addEventListener('click', () => {
    document.getElementById('form-exercise').reset();
    document.getElementById('exercise-edit-id').value = '';
    document.getElementById('modal-exercise-title').textContent = 'Novo Exercício';
    document.getElementById('modal-exercise').classList.remove('hidden');
  });

  // Submissão do formulário de exercício
  document.getElementById('form-exercise').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('exercise-edit-id').value;
    const name = document.getElementById('ex-name').value.trim();
    const muscle = document.getElementById('ex-muscle').value;
    const equipment = document.getElementById('ex-equipment').value.trim();
    const notes = document.getElementById('ex-notes').value.trim();

    if (id) {
      const idx = state.exercises.findIndex(x => x.id === id);
      if (idx !== -1) {
        state.exercises[idx] = { id, name, muscle, equipment, notes };
      }
    } else {
      state.exercises.push({
        id: 'ex-' + Date.now(),
        name,
        muscle,
        equipment,
        notes
      });
    }

    saveExercises();
    document.getElementById('modal-exercise').classList.add('hidden');
    renderExercisesCatalog();
  });
}

function renderExercisesCatalog() {
  const container = document.getElementById('exercises-catalog-list');
  container.innerHTML = '';

  const list = state.exercises.filter(ex => {
    if (currentMuscleFilter === 'all') return true;
    return ex.muscle.toLowerCase() === currentMuscleFilter.toLowerCase();
  });

  if (list.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">Nenhum exercício encontrado nesta categoria.</p>`;
    return;
  }

  list.forEach(ex => {
    const card = document.createElement('div');
    card.className = 'catalog-card';
    card.innerHTML = `
      <div class="catalog-info">
        <h4>${ex.name}</h4>
        <div class="catalog-meta">
          <span class="catalog-muscle">${ex.muscle}</span>
          <span class="catalog-equip">• ${ex.equipment}</span>
        </div>
      </div>
      <div class="catalog-actions">
        <button class="btn btn-small btn-secondary btn-edit-ex" data-id="${ex.id}">✏️</button>
        <button class="btn btn-small btn-outline-danger btn-del-ex" data-id="${ex.id}">🗑️</button>
      </div>
    `;

    // Editar
    card.querySelector('.btn-edit-ex').addEventListener('click', () => {
      document.getElementById('exercise-edit-id').value = ex.id;
      document.getElementById('ex-name').value = ex.name;
      document.getElementById('ex-muscle').value = ex.muscle;
      document.getElementById('ex-equipment').value = ex.equipment;
      document.getElementById('ex-notes').value = ex.notes || '';
      document.getElementById('modal-exercise-title').textContent = 'Editar Exercício';
      document.getElementById('modal-exercise').classList.remove('hidden');
    });

    // Excluir
    card.querySelector('.btn-del-ex').addEventListener('click', () => {
      if (confirm(`Deseja excluir o exercício "${ex.name}"?`)) {
        state.exercises = state.exercises.filter(x => x.id !== ex.id);
        saveExercises();
        renderExercisesCatalog();
      }
    });

    container.appendChild(card);
  });
}

// --- 8. ABA HISTÓRICO ---
function setupHistoryTab() {
  renderHistoryList();
}

function renderHistoryList() {
  const container = document.getElementById('history-list');
  container.innerHTML = '';

  if (!state.history || state.history.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 40px 10px;">
        <span style="font-size: 40px; display: block; margin-bottom: 10px;">📊</span>
        <p>Ainda não há treinos registrados.</p>
        <p style="font-size: 13px;">Assim que você finalizar seu primeiro treino, o resumo detalhado aparecerá aqui!</p>
      </div>
    `;
    return;
  }

  state.history.forEach((h) => {
    const d = new Date(h.date);
    const dateFormatted = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeFormatted = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const card = document.createElement('div');
    card.className = 'history-card';

    let exercisesHtml = '';
    if (h.exercises) {
      exercisesHtml = h.exercises.map(e => `
        <div>• <strong>${e.name}</strong> (${formatTime(e.elapsedSeconds || 0)})</div>
      `).join('');
    }

    card.innerHTML = `
      <div class="history-header">
        <span class="history-title">${h.routineName || 'Treino'}</span>
        <span class="history-date">${dateFormatted} às ${timeFormatted}</span>
      </div>
      <div class="history-stats-bar">
        <div class="history-stat">Duração: <strong>${formatTime(h.totalSeconds)}</strong></div>
        <div class="history-stat">Séries feitas: <strong>${h.totalSetsCompleted || 0}</strong></div>
      </div>
      <div class="history-exercises-list">
        ${exercisesHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

// --- 9. ABA CONFIGURAÇÕES & BACKUP ---
function setupSettingsTab() {
  const goalInput = document.getElementById('setting-goal-minutes');
  goalInput.value = state.settings.goalMinutes || 60;

  // Salvar meta
  document.getElementById('btn-save-goal').addEventListener('click', () => {
    const val = parseInt(goalInput.value, 10);
    if (val >= 10 && val <= 300) {
      state.settings.goalMinutes = val;
      saveSettings();
      document.getElementById('display-goal-time').textContent = `${val} minutos`;
      alert('Meta de tempo diário atualizada!');
    }
  });

  // Exportar Backup JSON
  document.getElementById('btn-export-backup').addEventListener('click', () => {
    const dataToExport = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      exercises: state.exercises,
      routines: state.routines,
      history: state.history,
      settings: state.settings
    };
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meu-treino-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Importar Backup JSON
  const importInput = document.getElementById('input-import-backup');
  importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.exercises && imported.routines) {
          state.exercises = imported.exercises;
          state.routines = imported.routines;
          if (imported.history) state.history = imported.history;
          if (imported.settings) state.settings = imported.settings;

          saveExercises();
          saveRoutines();
          saveHistory();
          saveSettings();

          alert('Backup restaurado com sucesso!');
          location.reload();
        } else {
          alert('Arquivo de backup inválido.');
        }
      } catch (err) {
        alert('Erro ao processar arquivo JSON.');
      }
    };
    reader.readAsText(file);
  });

  // Restaurar dados padrão
  document.getElementById('btn-reset-defaults').addEventListener('click', () => {
    if (confirm('Atenção: Isso irá restaurar a lista inicial de exercícios e treinos. Confirma?')) {
      state.exercises = DEFAULT_EXERCISES;
      state.routines = DEFAULT_ROUTINES;
      saveExercises();
      saveRoutines();
      alert('Dados padrão restaurados!');
      location.reload();
    }
  });
}

// --- 10. MODAIS GERAIS ---
function setupModals() {
  // Modal de Exercício
  document.getElementById('btn-close-modal-exercise').addEventListener('click', () => {
    document.getElementById('modal-exercise').classList.add('hidden');
  });
  document.getElementById('btn-cancel-modal-exercise').addEventListener('click', () => {
    document.getElementById('modal-exercise').classList.add('hidden');
  });

  // Modal Seletor
  document.getElementById('btn-close-modal-select').addEventListener('click', () => {
    document.getElementById('modal-select-exercise').classList.add('hidden');
  });

  // Modal Trocar Dia
  document.getElementById('btn-close-switch-day').addEventListener('click', () => {
    document.getElementById('modal-switch-day').classList.add('hidden');
  });
}
