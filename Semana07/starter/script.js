
// SISTEMA DE GASTOS - SETS Y MAPS - SEMANA 07



// 1. ESTRUCTURAS DE DATOS PRINCIPALES


// Map → guarda gastos por ID único
const expensesMap = new Map();

// Set → guarda categorías únicas
const categoriesSet = new Set([
  'Alimentación',
  'Transporte',
  'Entretenimiento',
  'Salud'
]);

// WeakSet → tracking de gastos activos
const activeExpenses = new WeakSet();

// WeakMap → caché de cálculos
const calculationsCache = new WeakMap();

// Objeto para el caché (necesario para WeakMap)
const cacheKey = {};


// 2. CONSOLA DE LOGS


// Muestra mensajes en la consola visual
const log = (message, type = 'info') => {
  const console = document.getElementById('console-log');
  const line = document.createElement('div');
  line.className = `log-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  console.appendChild(line);
  console.scrollTop = console.scrollHeight;
};

const clearConsole = () => {
  document.getElementById('console-log').innerHTML = '';
};


// 3. REGISTRAR GASTO (Map)


const registerExpense = () => {
  const id = document.getElementById('input-id').value.trim();
  const name = document.getElementById('input-name').value.trim();
  const amount = Number(document.getElementById('input-amount').value);
  const category = document.getElementById('input-category').value;
  const feedback = document.getElementById('register-feedback');

  // Validaciones
  if (!id || !name || !amount || !category) {
    feedback.textContent = '❌ Todos los campos son obligatorios';
    feedback.className = 'feedback error';
    return;
  }

  // Verifica si el ID ya existe en el Map
  if (expensesMap.has(id)) {
    feedback.textContent = `❌ El ID "${id}" ya existe`;
    feedback.className = 'feedback error';
    log(`❌ ID duplicado: ${id}`, 'error');
    return;
  }

  // Crea el objeto del gasto
  const expense = { id, name, amount, category, date: new Date().toLocaleDateString() };

  // Guarda en el Map
  expensesMap.set(id, expense);

  // Agrega la categoría al Set (si no existe ya)
  categoriesSet.add(category);

  // Agrega al WeakSet como activo
  activeExpenses.add(expense);

  // Limpia el caché porque hay nuevos datos
  if (calculationsCache.has(cacheKey)) {
    calculationsCache.delete(cacheKey);
    log('🗑️ Caché invalidado por nuevo gasto', 'warn');
  }

  feedback.textContent = `✅ Gasto "${name}" registrado con ID: ${id}`;
  feedback.className = 'feedback success';

  log(`✅ Gasto registrado: ${name} ($${amount.toLocaleString()})`, 'success');

  // Limpia los campos
  document.getElementById('input-id').value = '';
  document.getElementById('input-name').value = '';
  document.getElementById('input-amount').value = '';
  document.getElementById('input-category').value = '';

  // Actualiza la interfaz
  renderExpenses();
  renderCategories();
  renderActiveExpenses();
};


// 4. RENDERIZAR GASTOS (Map)


const renderExpenses = () => {
  const container = document.getElementById('expenses-map');

  if (expensesMap.size === 0) {
    container.innerHTML = '<p style="color: var(--text-muted)">No hay gastos registrados</p>';
    return;
  }

  // Itera sobre el Map con for...of
  container.innerHTML = '';
  for (const [id, expense] of expensesMap) {
    const isActive = activeExpenses.has(expense);
    const card = document.createElement('div');
    card.className = `expense-card ${isActive ? 'active' : ''}`;
    card.innerHTML = `
      <div class="expense-id">🔑 ID: ${id}</div>
      <div class="expense-name">${expense.name}</div>
      <div class="expense-amount">$${expense.amount.toLocaleString()}</div>
      <span class="expense-category">${expense.category}</span>
      <div class="expense-actions">
        <button class="btn btn-small btn-secondary"
          onclick="toggleActive('${id}')">
          ${isActive ? '⏸️ Desactivar' : '▶️ Activar'}
        </button>
        <button class="btn btn-small btn-danger"
          onclick="deleteExpense('${id}')">
          🗑️
        </button>
      </div>
    `;
    container.appendChild(card);
  }

  log(`📋 Map actualizado: ${expensesMap.size} gastos`, 'info');
};


// 5. TOGGLE ACTIVO (WeakSet)


const toggleActive = (id) => {
  const expense = expensesMap.get(id);
  if (!expense) return;

  if (activeExpenses.has(expense)) {
    activeExpenses.delete(expense);
    log(`⏸️ Gasto desactivado: ${expense.name}`, 'warn');
  } else {
    activeExpenses.add(expense);
    log(`▶️ Gasto activado: ${expense.name}`, 'success');
  }

  renderExpenses();
  renderActiveExpenses();
};


// 6. ELIMINAR GASTO (Map)


const deleteExpense = (id) => {
  const expense = expensesMap.get(id);
  if (!expense) return;

  expensesMap.delete(id);
  log(`🗑️ Gasto eliminado: ${expense.name}`, 'warn');

  renderExpenses();
  renderActiveExpenses();
};


// 7. CATEGORÍAS (Set)


const addCategory = () => {
  const input = document.getElementById('input-new-category');
  const value = input.value.trim();

  if (!value) return;

  const sizeBefore = categoriesSet.size;
  categoriesSet.add(value);

  if (categoriesSet.size > sizeBefore) {
    log(`✅ Categoría agregada: ${value}`, 'success');
  } else {
    log(`⚠️ La categoría "${value}" ya existe en el Set`, 'warn');
  }

  input.value = '';
  renderCategories();
};

const renderCategories = () => {
  const container = document.getElementById('categories-set');
  container.innerHTML = '';

  // Itera sobre el Set
  for (const category of categoriesSet) {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = category;
    container.appendChild(tag);
  }

  log(`📁 Set de categorías: ${categoriesSet.size} únicas`, 'info');
};


// 8. GASTOS ACTIVOS (WeakSet)


const renderActiveExpenses = () => {
  const container = document.getElementById('active-expenses');
  container.innerHTML = '';

  let count = 0;
  for (const [id, expense] of expensesMap) {
    if (activeExpenses.has(expense)) {
      count++;
      const card = document.createElement('div');
      card.className = 'expense-card active';
      card.innerHTML = `
        <div class="expense-id">🔑 ${id}</div>
        <div class="expense-name">${expense.name}</div>
        <div class="expense-amount">$${expense.amount.toLocaleString()}</div>
        <span class="expense-category">${expense.category}</span>
      `;
      container.appendChild(card);
    }
  }

  if (count === 0) {
    container.innerHTML = '<p style="color: var(--text-muted)">No hay gastos activos</p>';
  }
};


// 9. OPERACIONES DE CONJUNTOS (Set)


const runSetOperations = () => {
  // Dos sets de ejemplo para operar
  const setAltos = new Set(
    [...expensesMap.values()]
      .filter(e => e.amount >= 50000)
      .map(e => e.category)
  );

  const setBajos = new Set(
    [...expensesMap.values()]
      .filter(e => e.amount < 50000)
      .map(e => e.category)
  );

  // Unión → todas las categorías
  const union = new Set([...setAltos, ...setBajos]);

  // Intersección → categorías en ambos sets
  const intersection = new Set(
    [...setAltos].filter(cat => setBajos.has(cat))
  );

  // Diferencia → solo en gastos altos
  const difference = new Set(
    [...setAltos].filter(cat => !setBajos.has(cat))
  );

  // Renderiza resultados
  renderSetResult('op-union', union, 'green');
  renderSetResult('op-intersection', intersection, 'purple');
  renderSetResult('op-difference', difference, 'orange');

  log(`🔗 Unión: ${union.size} categorías`, 'info');
  log(`🔀 Intersección: ${intersection.size} categorías`, 'info');
  log(`➖ Diferencia: ${difference.size} categorías`, 'info');
};

const renderSetResult = (containerId, set, colorClass) => {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (set.size === 0) {
    container.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8rem">Sin resultados</span>';
    return;
  }

  for (const item of set) {
    const tag = document.createElement('span');
    tag.className = `tag ${colorClass}`;
    tag.textContent = item;
    container.appendChild(tag);
  }
};


// 10. CACHÉ DE CÁLCULOS (WeakMap)


const calculateAndCache = () => {
  // Verifica si ya está en caché
  if (calculationsCache.has(cacheKey)) {
    const cached = calculationsCache.get(cacheKey);
    log('⚡ Datos obtenidos del caché (WeakMap)', 'success');
    renderCacheStats(cached);
    return;
  }

  // Calcula estadísticas
  const expenses = [...expensesMap.values()];

  if (expenses.length === 0) {
    log('❌ No hay gastos para calcular', 'error');
    return;
  }

  const total = expenses.reduce((acc, e) => acc + e.amount, 0);
  const average = Math.round(total / expenses.length);
  const max = expenses.reduce((a, b) => a.amount > b.amount ? a : b);
  const min = expenses.reduce((a, b) => a.amount < b.amount ? a : b);

  const stats = { total, average, max: max.name, min: min.name, count: expenses.size };

  // Guarda en WeakMap
  calculationsCache.set(cacheKey, stats);
  log('💾 Estadísticas calculadas y guardadas en WeakMap', 'success');

  renderCacheStats(stats);
};

const renderCacheStats = ({ total, average, max, min, count }) => {
  document.getElementById('cache-stats').innerHTML = `
    <div class="stat-box">
      <span class="stat-value">$${total.toLocaleString()}</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat-box">
      <span class="stat-value">$${average.toLocaleString()}</span>
      <span class="stat-label">Promedio</span>
    </div>
    <div class="stat-box">
      <span class="stat-value">${max}</span>
      <span class="stat-label">Mayor gasto</span>
    </div>
    <div class="stat-box">
      <span class="stat-value">${min}</span>
      <span class="stat-label">Menor gasto</span>
    </div>
  `;
};


// 11. INICIALIZAR


document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderExpenses();
  log('🚀 Sistema iniciado con Sets y Maps', 'success');
  log(`📁 Set inicial: ${categoriesSet.size} categorías`, 'info');
  log(`🗺️ Map inicial: ${expensesMap.size} gastos`, 'info');
});