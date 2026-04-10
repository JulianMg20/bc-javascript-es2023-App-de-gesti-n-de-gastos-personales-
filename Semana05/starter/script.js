// DASHBOARD DE ANÁLISIS - SEMANA 05


import { expenseRecords, CATEGORIES } from './data.js';


// 1. APLANAR ITEMS ANIDADOS (flatMap)


// Extrae todos los gastos de todos los registros
const getAllExpenses = () =>
  expenseRecords.flatMap(record =>
    record.expenses.map(expense => ({
      ...expense,
      recordId: record.id,
      date: record.date,
      location: record.location,
      status: record.status
    }))
  );


// 2. CALCULAR TOTAL POR REGISTRO (map + reduce)


const getTotalPerRecord = () =>
  expenseRecords.map(record => ({
    id: record.id,
    date: record.date,
    location: record.location,
    total: record.expenses.reduce((acc, e) => acc + e.amount, 0),
    items: record.expenses.length
  }));


// 3. TOP N GASTOS (chaining + toSorted)


const getTopExpenses = (n = 5) =>
  getAllExpenses()
    .toSorted((a, b) => b.amount - a.amount)
    .slice(0, n);


// 4. AGRUPAR POR CATEGORÍA (reduce)


const groupByCategory = () =>
  getAllExpenses().reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = acc[category] ?? { total: 0, count: 0, items: [] };
    acc[category].total += amount;
    acc[category].count += 1;
    acc[category].items.push(expense);
    return acc;
  }, {});


// 5. ESTADÍSTICAS GENERALES (reduce)


const getGeneralStats = () => {
  const allExpenses = getAllExpenses();
  const total = allExpenses.reduce((acc, e) => acc + e.amount, 0);
  const average = Math.round(total / allExpenses.length);
  const max = allExpenses.toSorted((a, b) => b.amount - a.amount)[0];
  const min = allExpenses.toSorted((a, b) => a.amount - b.amount)[0];

  return { total, average, max, min, count: allExpenses.length };
};


// 6. TENDENCIA TEMPORAL (groupBy mes)


const getMonthlyTrend = () =>
  expenseRecords.reduce((acc, record) => {
    const month = record.date.slice(0, 7); // "2025-01"
    const total = record.expenses.reduce((sum, e) => sum + e.amount, 0);
    acc[month] = (acc[month] ?? 0) + total;
    return acc;
  }, {});


// 7. BUSCAR ÚLTIMO ELEMENTO (findLast ES2023)


const getLastExpenseByCategory = (category) =>
  getAllExpenses().findLast(e => e.category === category);

const getLastHighExpense = (threshold = 100000) =>
  getAllExpenses().findLast(e => e.amount > threshold);


// 8. MODIFICAR SIN MUTAR (with ES2023)


const updateExpenseStatus = (index, newStatus) => {
  const records = expenseRecords.with(index, {
    ...expenseRecords[index],
    status: newStatus
  });
  return records;
};

// 9. FILTRAR POR FECHA (filter + chaining)


const filterByDateRange = (startDate, endDate) =>
  expenseRecords
    .filter(r => r.date >= startDate && r.date <= endDate)
    .flatMap(r => r.expenses.map(e => ({ ...e, date: r.date })));


// 10. CATEGORÍAS ÚNICAS (Array.from + Set)


const getUniqueCategories = () =>
  Array.from(new Set(getAllExpenses().map(e => e.category)));


// RENDERIZAR DASHBOARD


const formatCurrency = (value) =>
  `$${Number(value).toLocaleString('es-CO')}`;

const renderStats = () => {
  const { total, average, max, min, count } = getGeneralStats();

  document.getElementById('stat-total').textContent = formatCurrency(total);
  document.getElementById('stat-average').textContent = formatCurrency(average);
  document.getElementById('stat-max').textContent = `${max.name} (${formatCurrency(max.amount)})`;
  document.getElementById('stat-min').textContent = `${min.name} (${formatCurrency(min.amount)})`;
  document.getElementById('stat-count').textContent = count;
  document.getElementById('stat-records').textContent = expenseRecords.length;
};

const renderTopExpenses = () => {
  const top = getTopExpenses(5);
  const container = document.getElementById('top-expenses');
  container.innerHTML = top.map((e, i) => `
    <div class="ranking-item">
      <span class="rank">#${i + 1}</span>
      <div class="ranking-info">
        <span class="ranking-name">${e.name}</span>
        <span class="ranking-category">
          ${CATEGORIES[e.category]?.emoji} ${CATEGORIES[e.category]?.name}
        </span>
      </div>
      <span class="ranking-amount">${formatCurrency(e.amount)}</span>
    </div>
  `).join('');
};

const renderCategoryStats = () => {
  const groups = groupByCategory();
  const container = document.getElementById('category-stats');
  container.innerHTML = Object.entries(groups)
    .toSorted((a, b) => b[1].total - a[1].total)
    .map(([category, data]) => `
      <div class="category-card">
        <div class="category-header">
          <span>${CATEGORIES[category]?.emoji} ${CATEGORIES[category]?.name}</span>
          <span class="category-count">${data.count} gastos</span>
        </div>
        <div class="category-total">${formatCurrency(data.total)}</div>
        <div class="category-avg">
          Promedio: ${formatCurrency(Math.round(data.total / data.count))}
        </div>
      </div>
    `).join('');
};

const renderMonthlyTrend = () => {
  const trend = getMonthlyTrend();
  const container = document.getElementById('monthly-trend');
  container.innerHTML = Object.entries(trend)
    .toSorted((a, b) => a[0].localeCompare(b[0]))
    .map(([month, total]) => `
      <div class="trend-item">
        <span class="trend-month">${month}</span>
        <div class="trend-bar-container">
          <div class="trend-bar" style="width: ${Math.min((total / 800000) * 100, 100)}%"></div>
        </div>
        <span class="trend-amount">${formatCurrency(total)}</span>
      </div>
    `).join('');
};

const renderLastExpense = () => {
  const lastHigh = getLastHighExpense(100000);
  const container = document.getElementById('last-expense');
  if (lastHigh) {
    container.innerHTML = `
      <div class="last-item">
        <p>📌 <strong>${lastHigh.name}</strong></p>
        <p>💰 ${formatCurrency(lastHigh.amount)}</p>
        <p>📅 ${lastHigh.date}</p>
        <p>${CATEGORIES[lastHigh.category]?.emoji} ${CATEGORIES[lastHigh.category]?.name}</p>
      </div>
    `;
  }
};

// Filtro por categoría
const initFilter = () => {
  const select = document.getElementById('category-filter');
  const categories = getUniqueCategories();

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = `${CATEGORIES[cat]?.emoji} ${CATEGORIES[cat]?.name}`;
    select.appendChild(option);
  });

  select.addEventListener('change', () => {
    const selected = select.value;
    const container = document.getElementById('filtered-expenses');

    const filtered = selected === 'all'
      ? getAllExpenses()
      : getAllExpenses().filter(e => e.category === selected);

    const sorted = filtered.toSorted((a, b) => b.amount - a.amount);

    container.innerHTML = sorted.map(e => `
      <div class="expense-row">
        <span>${e.name}</span>
        <span>${CATEGORIES[e.category]?.emoji}</span>
        <span>${e.date}</span>
        <span class="amount">${formatCurrency(e.amount)}</span>
      </div>
    `).join('');
  });
};

// Inicializar dashboard
document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderTopExpenses();
  renderCategoryStats();
  renderMonthlyTrend();
  renderLastExpense();
  initFilter();
  console.log('✅ Dashboard inicializado');
});