// Meu Treino - PWA Offline App
// Gerenciamento de exercícios, rotinas semanais, execução de treino com cronômetros e histórico

// --- 1. DADOS INICIAIS (SEED - TREINO PUSH / PULL / LEGS / UPPER / LOWER) ---
const GIF_BASE = 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/';

const DEFAULT_EXERCISES = [
  // PUSH / Peito, Ombros, Tríceps
  { 
    id: 'ex-1', 
    name: 'Supino reto com barra', 
    muscle: 'Peito', 
    equipment: 'Barra e Banco', 
    notes: 'Manter escápulas aduzidas e pés firmes no chão. Descer a barra na linha dos mamilos sem bater no peito.',
    gifUrl: GIF_BASE + 'pectorals/barbell-bench-press.gif'
  },
  { 
    id: 'ex-2', 
    name: 'Supino inclinado com halteres', 
    muscle: 'Peito', 
    equipment: 'Halteres e Banco 30º', 
    notes: 'Foco na porção superior do peitoral. Manter banco inclinado a 30-45 graus e cotovelos a 45 graus.',
    gifUrl: GIF_BASE + 'pectorals/dumbbell-incline-bench-press.gif'
  },
  { 
    id: 'ex-3', 
    name: 'Desenvolvimento com halteres', 
    muscle: 'Ombros', 
    equipment: 'Halteres e Banco', 
    notes: 'Não arquear excessivamente a lombar. Elevar os halteres até quase se tocarem no topo.',
    gifUrl: GIF_BASE + 'delts/dumbbell-seated-shoulder-press.gif'
  },
  { 
    id: 'ex-4', 
    name: 'Elevação lateral com halteres', 
    muscle: 'Ombros', 
    equipment: 'Halteres', 
    notes: 'Subir até a altura dos ombros de forma controlada. Cotovelos levemente flexionados.',
    gifUrl: GIF_BASE + 'delts/dumbbell-lateral-raise.gif'
  },
  { 
    id: 'ex-5', 
    name: 'Tríceps na polia com corda', 
    muscle: 'Tríceps', 
    equipment: 'Polia Alta', 
    notes: 'Cotovelos travados ao lado do corpo. Abrir a corda no final estendendo completamente.',
    gifUrl: GIF_BASE + 'triceps/cable-triceps-pushdown-v-bar.gif'
  },
  { 
    id: 'ex-6', 
    name: 'Tríceps francês na polia', 
    muscle: 'Tríceps', 
    equipment: 'Polia Baixa / Média', 
    notes: 'Cotovelos estáveis apontando para a frente. Movimento apenas do antebraço.',
    gifUrl: GIF_BASE + 'triceps/cable-overhead-triceps-extension-rope-attachment.gif'
  },

  // PULL / Costas, Ombros Posterior, Bíceps
  { 
    id: 'ex-7', 
    name: 'Puxada alta na polia', 
    muscle: 'Costas', 
    equipment: 'Polia Alta', 
    notes: 'Puxar direcionando os cotovelos para o chão, com o peito estufado e tronco levemente inclinado.',
    gifUrl: GIF_BASE + 'lats/cable-lat-pulldown-full-range-of-motion.gif'
  },
  { 
    id: 'ex-8', 
    name: 'Remada baixa com triângulo', 
    muscle: 'Costas', 
    equipment: 'Polia / Máquina', 
    notes: 'Manter coluna ereta e puxar em direção ao umbigo, esmagando as costas no final.',
    gifUrl: GIF_BASE + 'upper-back/cable-low-seated-row.gif'
  },
  { 
    id: 'ex-9', 
    name: 'Remada com halteres apoiado no banco', 
    muscle: 'Costas', 
    equipment: 'Halteres e Banco Inclinado', 
    notes: 'Peito apoiado no banco, alívio total na lombar. Puxar cotovelos apontando para trás.',
    gifUrl: GIF_BASE + 'upper-back/dumbbell-incline-row.gif'
  },
  { 
    id: 'ex-10', 
    name: 'Crucifixo inverso na máquina', 
    muscle: 'Ombros', 
    equipment: 'Máquina Peck Deck Inverso', 
    notes: 'Foco no deltóide posterior. Manter cotovelos na altura dos ombros.',
    gifUrl: GIF_BASE + 'delts/lever-seated-reverse-fly-parallel-grip.gif'
  },
  { 
    id: 'ex-11', 
    name: 'Rosca direta com barra', 
    muscle: 'Bíceps', 
    equipment: 'Barra W ou Reta', 
    notes: 'Cotovelos colados ao corpo sem balançar o tronco. Foco na contração do bíceps.',
    gifUrl: GIF_BASE + 'biceps/barbell-curl.gif'
  },
  { 
    id: 'ex-12', 
    name: 'Rosca martelo com halteres', 
    muscle: 'Bíceps', 
    equipment: 'Halteres', 
    notes: 'Pegada neutra (palmas viradas uma para a outra). Fortalece o braquial e antebraço.',
    gifUrl: GIF_BASE + 'biceps/dumbbell-alternate-seated-hammer-curl.gif'
  },

  // LEGS / Pernas, Glúteos, Panturrilha
  { 
    id: 'ex-13', 
    name: 'Agachamento com barra', 
    muscle: 'Pernas', 
    equipment: 'Barra Olímpica / Suporte', 
    notes: 'Pés na largura dos ombros, descida controlada empurrando o quadril para trás. Joelhos alinhados às pontas dos pés.',
    gifUrl: GIF_BASE + 'glutes/barbell-full-squat.gif'
  },
  { 
    id: 'ex-14', 
    name: 'Leg press 45°', 
    muscle: 'Pernas', 
    equipment: 'Máquina', 
    notes: 'Costas bem apoiadas no encosto. Descer em 90 graus e nunca travar (estalar) os joelhos no topo.',
    gifUrl: GIF_BASE + 'calves/lever-seated-squat-calf-raise-on-leg-press-machine.gif'
  },
  { 
    id: 'ex-15', 
    name: 'Cadeira extensora', 
    muscle: 'Pernas', 
    equipment: 'Máquina', 
    notes: 'Segurar 1 segundo no topo contraindo a coxa (quadríceps). Descida lenta.',
    gifUrl: GIF_BASE + 'quads/lever-leg-extension.gif'
  },
  { 
    id: 'ex-16', 
    name: 'Mesa ou cadeira flexora', 
    muscle: 'Pernas', 
    equipment: 'Máquina', 
    notes: 'Contração firme na parte posterior da coxa sem levantar o quadril do banco.',
    gifUrl: GIF_BASE + 'hamstrings/lever-kneeling-leg-curl.gif'
  },
  { 
    id: 'ex-17', 
    name: 'Elevação pélvica', 
    muscle: 'Pernas', 
    equipment: 'Barra ou Banco / Máquina', 
    notes: 'Aperto máximo nos glúteos no ponto mais alto. Manter queixo próximo ao peito.',
    gifUrl: GIF_BASE + 'glutes/barbell-glute-bridge.gif'
  },
  { 
    id: 'ex-18', 
    name: 'Panturrilha em pé na máquina', 
    muscle: 'Pernas', 
    equipment: 'Máquina / Degrau', 
    notes: 'Amplitude total: alongar bem embaixo e subir tudo na ponta dos pés.',
    gifUrl: GIF_BASE + 'calves/barbell-standing-calf-raise.gif'
  },

  // UPPER / Superior Completo
  { 
    id: 'ex-19', 
    name: 'Supino inclinado na máquina', 
    muscle: 'Peito', 
    equipment: 'Máquina Articulada', 
    notes: 'Movimento guiado e seguro para peitoral superior. Ajuste a altura do banco.',
    gifUrl: GIF_BASE + 'pectorals/lever-incline-chest-press-v-2.gif'
  },
  { 
    id: 'ex-20', 
    name: 'Puxada alta com pegada neutra', 
    muscle: 'Costas', 
    equipment: 'Polia e Triângulo Neutro', 
    notes: 'Ótima amplitude e conforto nos punhos e ombros. Puxar até a parte superior do peito.',
    gifUrl: GIF_BASE + 'lats/cable-lat-pulldown-full-range-of-motion.gif'
  },
  { 
    id: 'ex-21', 
    name: 'Remada unilateral com halter', 
    muscle: 'Costas', 
    equipment: 'Halter e Banco', 
    notes: 'Puxar o halter em direção ao quadril mantendo as costas retas.',
    gifUrl: GIF_BASE + 'upper-back/dumbbell-reverse-grip-incline-bench-one-arm-row.gif'
  },
  { 
    id: 'ex-22', 
    name: 'Elevação lateral na polia', 
    muscle: 'Ombros', 
    equipment: 'Polia Baixa', 
    notes: 'Tensão constante em toda a amplitude. Puxar na linha do corpo até a altura do ombro.',
    gifUrl: GIF_BASE + 'delts/cable-lateral-raise.gif'
  },
  { 
    id: 'ex-23', 
    name: 'Rosca inclinada com halteres', 
    muscle: 'Bíceps', 
    equipment: 'Halteres e Banco 45º', 
    notes: 'Alongamento máximo do bíceps no início do movimento. Deixar os braços estenderem bem.',
    gifUrl: GIF_BASE + 'biceps/dumbbell-incline-curl-v-2.gif'
  },

  // LOWER / Inferior e Core
  { 
    id: 'ex-24', 
    name: 'Levantamento terra romeno com halteres', 
    muscle: 'Pernas', 
    equipment: 'Halteres', 
    notes: 'Quadril para trás, coluna reta, joelhos semiflexionados. Sentir os posteriores de coxa alongarem.',
    gifUrl: GIF_BASE + 'glutes/dumbbell-romanian-deadlift.gif'
  },
  { 
    id: 'ex-25', 
    name: 'Afundo reverso', 
    muscle: 'Pernas', 
    equipment: 'Halteres ou Peso Corporal', 
    notes: 'Passo largo para trás, 90º nos dois joelhos. Tronco levemente inclinado para frente.',
    gifUrl: GIF_BASE + 'glutes/dumbbell-rear-lunge.gif'
  },
  { 
    id: 'ex-26', 
    name: 'Cadeira abdutora', 
    muscle: 'Pernas', 
    equipment: 'Máquina', 
    notes: 'Tronco firme encostado no banco. Abrir as pernas até a contração máxima do glúteo médio.',
    gifUrl: GIF_BASE + 'abductors/lever-seated-hip-abduction.gif'
  },
  { 
    id: 'ex-27', 
    name: 'Panturrilha sentada', 
    muscle: 'Pernas', 
    equipment: 'Máquina de Panturrilha', 
    notes: 'Foco no músculo sóleo. Descer o calcanhar ao máximo e subir até contrair bem.',
    gifUrl: GIF_BASE + 'calves/lever-seated-calf-raise.gif'
  },
  { 
    id: 'ex-28', 
    name: 'Abdominal crunch', 
    muscle: 'Abdômen', 
    equipment: 'Colchonete / Solo', 
    notes: 'Aproximar costelas do quadril sem forçar o pescoço com as mãos. Soltar o ar ao subir.',
    gifUrl: GIF_BASE + 'abs/crunch-floor.gif'
  }
];

const DEFAULT_ROUTINES = {
  seg: {
    name: 'Segunda-feira — PUSH',
    focus: 'Peito, Ombros e Tríceps',
    items: [
      { exerciseId: 'ex-1', sets: 3, reps: 10, weight: 20 },
      { exerciseId: 'ex-2', sets: 3, reps: 10, weight: 12 },
      { exerciseId: 'ex-3', sets: 3, reps: 10, weight: 10 },
      { exerciseId: 'ex-4', sets: 3, reps: 12, weight: 6 },
      { exerciseId: 'ex-5', sets: 3, reps: 12, weight: 15 },
      { exerciseId: 'ex-6', sets: 3, reps: 12, weight: 12 }
    ]
  },
  ter: {
    name: 'Terça-feira — PULL',
    focus: 'Costas, Posterior de Ombro e Bíceps',
    items: [
      { exerciseId: 'ex-7', sets: 3, reps: 10, weight: 35 },
      { exerciseId: 'ex-8', sets: 3, reps: 10, weight: 30 },
      { exerciseId: 'ex-9', sets: 3, reps: 10, weight: 12 },
      { exerciseId: 'ex-10', sets: 3, reps: 12, weight: 20 },
      { exerciseId: 'ex-11', sets: 3, reps: 10, weight: 12 },
      { exerciseId: 'ex-12', sets: 3, reps: 10, weight: 10 }
    ]
  },
  qua: {
    name: 'Quarta-feira — LEGS',
    focus: 'Pernas, Glúteos e Panturrilhas',
    items: [
      { exerciseId: 'ex-13', sets: 3, reps: 10, weight: 20 },
      { exerciseId: 'ex-14', sets: 3, reps: 10, weight: 80 },
      { exerciseId: 'ex-15', sets: 3, reps: 12, weight: 30 },
      { exerciseId: 'ex-16', sets: 3, reps: 12, weight: 25 },
      { exerciseId: 'ex-17', sets: 3, reps: 10, weight: 20 },
      { exerciseId: 'ex-18', sets: 3, reps: 15, weight: 40 }
    ]
  },
  qui: {
    name: 'Quinta-feira — UPPER',
    focus: 'Superior Completo (Peito, Costas, Ombros e Braços)',
    items: [
      { exerciseId: 'ex-19', sets: 3, reps: 10, weight: 25 },
      { exerciseId: 'ex-20', sets: 3, reps: 10, weight: 35 },
      { exerciseId: 'ex-21', sets: 3, reps: 10, weight: 12 },
      { exerciseId: 'ex-22', sets: 3, reps: 12, weight: 5 },
      { exerciseId: 'ex-23', sets: 3, reps: 10, weight: 8 },
      { exerciseId: 'ex-5', sets: 3, reps: 12, weight: 15 }
    ]
  },
  sex: {
    name: 'Sexta-feira — LOWER',
    focus: 'Inferiores e Abdômen',
    items: [
      { exerciseId: 'ex-24', sets: 3, reps: 10, weight: 12 },
      { exerciseId: 'ex-25', sets: 3, reps: 10, weight: 0 },
      { exerciseId: 'ex-16', sets: 3, reps: 12, weight: 25 },
      { exerciseId: 'ex-26', sets: 3, reps: 15, weight: 30 },
      { exerciseId: 'ex-27', sets: 3, reps: 15, weight: 20 },
      { exerciseId: 'ex-28', sets: 3, reps: 15, weight: 0 }
    ]
  },
  sab: {
    name: 'Sábado — Descanso ou Cardio',
    focus: 'Caminhada ou descanso ativo',
    items: []
  },
  dom: {
    name: 'Domingo — Descanso Total',
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
    const versionKey = 'mt_app_version';
    const currentVersion = '2.1-gifs';
    const savedVersion = localStorage.getItem(versionKey);

    const rawEx = localStorage.getItem('mt_exercises');
    const rawRoutines = localStorage.getItem('mt_routines');

    if (!savedVersion || savedVersion !== currentVersion) {
      state.exercises = DEFAULT_EXERCISES;
      state.routines = DEFAULT_ROUTINES;
      saveExercises();
      saveRoutines();
      localStorage.setItem(versionKey, currentVersion);
    } else {
      state.exercises = rawEx ? JSON.parse(rawEx) : DEFAULT_EXERCISES;
      state.routines = rawRoutines ? JSON.parse(rawRoutines) : DEFAULT_ROUTINES;
    }

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

// Lembrete da Carga Anterior
function getLastPerformance(exerciseId, exerciseName) {
  if (!state.history || state.history.length === 0) return null;

  for (const session of state.history) {
    if (!session.exercises) continue;
    const found = session.exercises.find(e => 
      (e.exerciseId && e.exerciseId === exerciseId) || 
      (e.name && e.name.toLowerCase() === exerciseName.toLowerCase())
    );
    if (found && found.sets && found.sets.length > 0) {
      const validSets = found.sets.filter(s => s.completed || s.weight > 0);
      if (validSets.length > 0) {
        const maxSet = validSets.reduce((prev, cur) => (prev.weight > cur.weight ? prev : cur));
        return {
          weight: maxSet.weight,
          reps: maxSet.reps,
          date: session.date
        };
      }
    }
  }
  return null;
}

// Ofensiva Semanal (Streak Tracker)
function updateStreakDisplay() {
  const streakRow = document.getElementById('streak-days-row');
  if (!streakRow) return;
  streakRow.innerHTML = '';

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Dom, 1 = Seg ...
  const diffToSeg = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToSeg);
  monday.setHours(0, 0, 0, 0);

  const daysShort = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  let weekCompletedCount = 0;

  for (let i = 0; i < 7; i++) {
    const curDate = new Date(monday);
    curDate.setDate(monday.getDate() + i);

    const isToday = curDate.toDateString() === today.toDateString();
    const dateStr = curDate.toISOString().slice(0, 10);
    const hasWorkout = state.history.some(h => h.date && h.date.startsWith(dateStr));

    if (hasWorkout) weekCompletedCount++;

    const div = document.createElement('div');
    div.className = `streak-day-item ${hasWorkout ? 'done' : ''} ${isToday ? 'today' : ''}`;
    div.innerHTML = `
      <span class="streak-day-name">${daysShort[i]}</span>
      <span class="streak-day-status">${hasWorkout ? '✓' : ''}</span>
    `;
    streakRow.appendChild(div);
  }

  const streakCountEl = document.getElementById('streak-count');
  const streakStatusEl = document.getElementById('streak-status-text');
  if (streakCountEl) streakCountEl.textContent = `${weekCompletedCount} ${weekCompletedCount === 1 ? 'dia' : 'dias'}`;
  if (streakStatusEl) {
    streakStatusEl.textContent = weekCompletedCount > 0 
      ? `${weekCompletedCount} de 5 treinos nesta semana` 
      : 'Bora começar a semana!';
  }
}

// Guia de Aquecimento Inteligente (Warmup)
function openWarmupModal() {
  const todayKey = currentSessionDayKey || getTodayKey();
  const routine = state.routines[todayKey] || { name: '' };
  const rName = (routine.name || '').toLowerCase();

  let warmupItems = [];
  let leadText = '';

  if (rName.includes('push') || rName.includes('peito') || rName.includes('upper') || rName.includes('ombro')) {
    leadText = 'Foco em aquecer peitoral, ombros e cotovelos com segurança antes das cargas.';
    warmupItems = [
      {
        title: '1. Elevação de Temperatura (3 a 5 min)',
        desc: 'Caminhada rápida na esteira ou polichinelos leves para aumentar a circulação sanguínea.'
      },
      {
        title: '2. Mobilidade de Ombros e Manguito (2 min)',
        desc: 'Faça 10 a 15 círculos com os braços para frente e para trás, e rotações com elástico ou halter leve de 1kg.'
      },
      {
        title: '3. Série de Reconhecimento (1 série)',
        desc: 'No primeiro exercício de hoje, faça 1 série de 12 repetições apenas com a barra vazia ou 30% da carga.'
      }
    ];
  } else if (rName.includes('pull') || rName.includes('costas') || rName.includes('bíceps')) {
    leadText = 'Foco em mobilidade de escápulas, dorsais e articulação do cotovelo.';
    warmupItems = [
      {
        title: '1. Aquecimento Geral (3 a 5 min)',
        desc: 'Esteira leve ou elíptico para acordar o corpo e preparar o sistema cardiovascular.'
      },
      {
        title: '2. Ativação de Escápulas (2 min)',
        desc: 'Sente na puxada alta com peso mínimo, focando apenas em subir e descer as escápulas sem dobrar os braços.'
      },
      {
        title: '3. Série de Reconhecimento (1 série)',
        desc: 'Faça a primeira série do exercício inicial com menos da metade da carga normal, sentindo o músculo dorsal.'
      }
    ];
  } else {
    leadText = 'Foco em aquecer quadril, joelhos e tornozelos para agachar com firmeza.';
    warmupItems = [
      {
        title: '1. Bicicleta ou Esteira Inclinada (4 min)',
        desc: 'Pedale em ritmo moderado para lubrificar as articulações dos joelhos e quadril.'
      },
      {
        title: '2. Mobilidade de Quadril e Tornozelo (2 min)',
        desc: '10 agachamentos profundos segurando em um suporte firme, alongando a virilha e calcanhares no chão.'
      },
      {
        title: '3. Série de Reconhecimento (1 série)',
        desc: '1 série de 10 agachamentos livres apenas com o peso do próprio corpo ou barra sem anilhas.'
      }
    ];
  }

  document.getElementById('warmup-lead-text').textContent = leadText;
  const container = document.getElementById('warmup-checklist-container');
  container.innerHTML = '';

  warmupItems.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'warmup-item';
    div.innerHTML = `
      <div class="warmup-checkbox">✓</div>
      <div class="warmup-text-area">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `;
    div.addEventListener('click', () => {
      div.classList.toggle('done');
    });
    container.appendChild(div);
  });

  document.getElementById('modal-warmup').classList.remove('hidden');
}

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
  updateStreakDisplay();

  // Botão Iniciar Treino
  document.getElementById('btn-start-workout').addEventListener('click', () => {
    startWorkoutSession(currentSessionDayKey);
  });

  // Botão Guia de Aquecimento
  document.getElementById('btn-open-warmup').addEventListener('click', () => {
    openWarmupModal();
  });

  // Botão Trocar Dia do Treino
  document.getElementById('btn-switch-day').addEventListener('click', () => {
    openSwitchDayModal();
  });

  // Controles do Treino Ativo
  document.getElementById('btn-next-exercise').addEventListener('click', nextExercise);
  document.getElementById('btn-prev-exercise').addEventListener('click', prevExercise);
  document.getElementById('btn-show-gif-live').addEventListener('click', () => {
    if (!state.activeWorkout) return;
    const curIdx = state.activeWorkout.currentExerciseIndex;
    const curEx = state.activeWorkout.exercisesData[curIdx];
    if (curEx) {
      openGifModal(curEx.exerciseName, curEx.gifUrl, curEx.notes);
    }
  });
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
        gifUrl: ex.gifUrl || '',
        notes: ex.notes || '',
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

  // Lembrete da Carga Anterior
  const banner = document.getElementById('live-last-weight-banner');
  const lastPerf = getLastPerformance(exData.exerciseId, exData.exerciseName);
  if (lastPerf && lastPerf.weight > 0) {
    banner.classList.remove('hidden');
    document.getElementById('live-last-weight-val').textContent = `${lastPerf.weight}kg (${lastPerf.reps} reps)`;
  } else {
    banner.classList.add('hidden');
  }

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
      exerciseId: e.exerciseId,
      name: e.exerciseName,
      muscle: e.muscle,
      elapsedSeconds: e.elapsedSeconds,
      sets: e.setsDone.map(s => ({ reps: s.reps, weight: s.weight, completed: s.completed }))
    }))
  };

  state.history.unshift(historyEntry);
  saveHistory();
  updateStreakDisplay();

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
        ${ex.gifUrl ? `<button class="btn btn-small btn-secondary btn-gif-ex" title="Ver Execução (GIF)">🎬</button>` : ''}
        <button class="btn btn-small btn-secondary btn-edit-ex" data-id="${ex.id}">✏️</button>
        <button class="btn btn-small btn-outline-danger btn-del-ex" data-id="${ex.id}">🗑️</button>
      </div>
    `;

    // Ver GIF no catálogo
    if (ex.gifUrl) {
      card.querySelector('.btn-gif-ex').addEventListener('click', () => {
        openGifModal(ex.name, ex.gifUrl, ex.notes);
      });
    }

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
        <div>
          <span class="history-title">${h.routineName || 'Treino'}</span>
          <div class="history-date">${dateFormatted} às ${timeFormatted}</div>
        </div>
        <button class="btn-del-history-item" data-id="${h.id}" title="Excluir este treino">&times;</button>
      </div>
      <div class="history-stats-bar">
        <div class="history-stat">Duração: <strong>${formatTime(h.totalSeconds)}</strong></div>
        <div class="history-stat">Séries feitas: <strong>${h.totalSetsCompleted || 0}</strong></div>
      </div>
      <div class="history-exercises-list">
        ${exercisesHtml}
      </div>
    `;

    // Excluir treino individual com confirmação segura
    card.querySelector('.btn-del-history-item').addEventListener('click', () => {
      openConfirmDeleteModal({
        title: 'Excluir Treino',
        message: `Deseja realmente apagar o registro do treino <strong>${h.routineName || 'Treino'}</strong> realizado em ${dateFormatted} às ${timeFormatted}?`,
        requireTyping: false,
        onConfirm: () => {
          state.history = state.history.filter(item => item.id !== h.id);
          saveHistory();
          renderHistoryList();
          updateStreakDisplay();
        }
      });
    });

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

  // Limpar todo o histórico de treinos com dupla verificação
  document.getElementById('btn-clear-history').addEventListener('click', () => {
    openConfirmDeleteModal({
      title: '⚠️ Excluir Todo o Histórico',
      message: 'Esta ação irá <strong>apagar definitivamente</strong> todos os registros de treinos passados e resetar sua contagem de ofensiva semanal.',
      requireTyping: true,
      onConfirm: () => {
        state.history = [];
        saveHistory();
        renderHistoryList();
        updateStreakDisplay();
        alert('Histórico de treinos apagado com sucesso!');
      }
    });
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
let pendingDeleteAction = null;

function openConfirmDeleteModal({ title, message, requireTyping = false, onConfirm }) {
  document.getElementById('modal-confirm-title').textContent = title;
  document.getElementById('modal-confirm-msg').innerHTML = message;
  
  const typeContainer = document.getElementById('confirm-type-container');
  const inputKeyword = document.getElementById('input-confirm-keyword');
  const btnExec = document.getElementById('btn-execute-confirm');

  inputKeyword.value = '';
  pendingDeleteAction = onConfirm;

  if (requireTyping) {
    typeContainer.classList.remove('hidden');
    btnExec.classList.add('btn-disabled');
    btnExec.textContent = 'Excluir Definitivamente';

    inputKeyword.oninput = () => {
      const isMatch = inputKeyword.value.trim().toUpperCase() === 'EXCLUIR';
      if (isMatch) {
        btnExec.classList.remove('btn-disabled');
      } else {
        btnExec.classList.add('btn-disabled');
      }
    };
  } else {
    typeContainer.classList.add('hidden');
    btnExec.classList.remove('btn-disabled');
    btnExec.textContent = 'Sim, Excluir';
    inputKeyword.oninput = null;
  }

  document.getElementById('modal-confirm-delete').classList.remove('hidden');
  if (requireTyping) {
    setTimeout(() => inputKeyword.focus(), 150);
  }
}

function openGifModal(name, gifUrl, notes) {
  document.getElementById('modal-gif-title').textContent = name;
  const img = document.getElementById('modal-gif-img');
  img.src = gifUrl || '';
  document.getElementById('modal-gif-notes').textContent = notes || 'Mantenha a postura alinhada, escápulas travadas e controle em toda a amplitude.';
  document.getElementById('modal-gif').classList.remove('hidden');
}

function setupModals() {
  // Modal de Confirmação Segura
  const modalConfirm = document.getElementById('modal-confirm-delete');
  const closeModalConfirm = () => {
    modalConfirm.classList.add('hidden');
    pendingDeleteAction = null;
  };

  document.getElementById('btn-close-modal-confirm').addEventListener('click', closeModalConfirm);
  document.getElementById('btn-cancel-confirm').addEventListener('click', closeModalConfirm);
  modalConfirm.addEventListener('click', (e) => {
    if (e.target === modalConfirm) closeModalConfirm();
  });

  document.getElementById('btn-execute-confirm').addEventListener('click', () => {
    if (typeof pendingDeleteAction === 'function') {
      pendingDeleteAction();
    }
    closeModalConfirm();
  });

  // Modal de Aquecimento
  const modalWarmup = document.getElementById('modal-warmup');
  document.getElementById('btn-close-modal-warmup').addEventListener('click', () => {
    modalWarmup.classList.add('hidden');
  });
  document.getElementById('btn-finish-warmup').addEventListener('click', () => {
    modalWarmup.classList.add('hidden');
  });
  modalWarmup.addEventListener('click', (e) => {
    if (e.target === modalWarmup) {
      modalWarmup.classList.add('hidden');
    }
  });

  // Modal de GIF
  const modalGif = document.getElementById('modal-gif');
  document.getElementById('btn-close-modal-gif').addEventListener('click', () => {
    modalGif.classList.add('hidden');
    document.getElementById('modal-gif-img').src = '';
  });
  modalGif.addEventListener('click', (e) => {
    if (e.target === modalGif) {
      modalGif.classList.add('hidden');
      document.getElementById('modal-gif-img').src = '';
    }
  });

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
