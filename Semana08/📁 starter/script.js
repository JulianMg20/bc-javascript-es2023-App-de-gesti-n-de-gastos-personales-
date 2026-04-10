// =============================================
// PAGINADOR DE GASTOS - SEMANA 08
// =============================================

// =============================================
// 1. DATOS DEL DOMINIO
// =============================================

const CATEGORIES = ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud'];
const CATEGORY_CLASSES = {
  'Alimentación': 'food',
  'Transporte': 'transport',
  'Entretenimiento': 'entertainment',
  'Salud': 'health'
};

const EXPENSE_NAMES = {
  'Alimentación': ['Almuerzo', 'Mercado', 'Domicilio', 'Café', 'Restaurante', 'Desayuno', 'Cena'],
  'Transporte': ['Bus', 'Taxi', 'Metro', 'Gasolina', 'Tiquete', 'Uber', 'TransMilenio'],
  'Entretenimiento': ['Netflix', 'Spotify', 'Cine', 'Concierto', 'HBO Max', 'YouTube', 'Videojuego'],
  'Salud': ['Médico', 'Farmacia', 'Odontólogo', 'Medicamentos', 'Examen', 'Optómetra', 'Gym']
};

const PRIORITIES = ['Alta', 'Media', 'Baja'];

// =============================================
// 2. GENERADOR DE GASTOS (función*)
// =============================================

// Genera gastos de forma lazy (bajo demanda)
function* expenseGenerator(totalExpenses) {
  for (let i = 1; i <= totalExpenses; i++) {
    // Selecciona categoría aleatoria
    const category = CATEGORIES[i % CATEGORIES.length];
    const names = EXPENSE_NAMES[category];
    const name = names[i % names.length];

    // Genera monto aleatorio según categoría
    const amounts = {
      'Alimentación': 8000 + (i * 3000) % 180000,
      'Transporte': 5000 + (i * 2000) % 120000,
      'Entretenimiento': 15000 + (i * 5000) % 250000,
      'Salud': 20000 + (i * 4000) % 200000
    };

    // yield → pausa y entrega este gasto
    yield {
      id: i,
      name: `${name} #${i}`,
      category,
      amount: amounts[category],
      priority: PRIORITIES[i % PRIORITIES.length],
      date: `${String(Math.ceil(i / 3) % 28 + 1).padStart(2,'0')}/${String((i % 12) + 1).padStart(2,'0')}/2025`
    };
  }
}

// =============================================
// 3. GENERADOR - TOMAR N ELEMENTOS
// =============================================

// Toma solo n elementos del generador
function* take(iterator, n) {
  for (let i = 0; i < n; i++) {
    const { value, done } = iterator.next();
    if (done) return;
    yield value; // entrega uno por uno
  }
}

// Salta n elementos del generador
function skip(iterator, n) {
  for (let i = 0; i < n; i++) {
    const { done } = iterator.next();
    if (done) break;
  }
}

// =============================================
// 4. CLASE PAGINATOR
// =============================================

class Paginator {
  constructor(totalItems, itemsPerPage = 10) {
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPageNum = 1;
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
    this.allData = []; // guarda todos los datos generados

    // Genera todos los datos una vez
    this._generateAllData();
  }

  // Genera y guarda todos los datos
  _generateAllData() {
    const gen = expenseGenerator(this.totalItems);
    this.allData = [...gen]; // convierte el generador a array
    console.log(`✅ Generador creó ${this.allData.length} gastos`);
  }

  // Generador de la página actual
  *currentPage() {
    const start = (this.currentPageNum - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const pageData = this.allData.slice(start, end);

    // yield cada elemento de la página actual
    for (const item of pageData) {
      yield item;
    }
  }

  // Ir a la siguiente página
  next() {
    if (this.currentPageNum < this.totalPages) {
      this.currentPageNum++;
      return true;
    }
    return false;
  }

  // Ir a la página anterior
  previous() {
    if (this.currentPageNum > 1) {
      this.currentPageNum--;
      return true;
    }
    return false;
  }

  // Ir a una página específica
  goTo(pageNum) {
    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.currentPageNum = pageNum;
      return true;
    }
    return false;
  }

  // Cambia items por página
  setItemsPerPage(n) {
    this.itemsPerPage = n;
    this.totalPages = Math.ceil(this.totalItems / n);
    this.currentPageNum = 1;
  }

  // Filtra los datos
  filter(query = '', category = 'all') {
    return this.allData.filter(item => {
      const matchName = item.name.toLowerCase()
        .includes(query.toLowerCase());
      const matchCategory = category === 'all' ||
        item.category === category;
      return matchName && matchCategory;
    });
  }
}

// =============================================
// 5. INSTANCIA Y ESTADO GLOBAL
// =============================================

const TOTAL_EXPENSES = 80;
let paginator = new Paginator(TOTAL_EXPENSES, 10);
let filteredData = [];
let isFiltered = false;

// =============================================
// 6. RENDERIZAR GASTOS
// =============================================

const formatCurrency = (value) =>
  `$${Number(value).toLocaleString('es-CO')}`;

const renderExpenses = () => {
  const container = document.getElementById('expenses-container');
  container.innerHTML = '';

  // Obtiene items de la página actual usando el generador
  let items = [];

  if (isFiltered) {
    // Si hay filtro activo usa los datos filtrados
    const start = (paginator.currentPageNum - 1) * paginator.itemsPerPage;
    items = filteredData.slice(start, start + paginator.itemsPerPage);
  } else {
    // Usa el generador para obtener la página actual
    for (const item of paginator.currentPage()) {
      items.push(item);
    }
  }

  if (items.length === 0) {
    container.innerHTML = '<div class="empty-state">😔 No se encontraron gastos</div>';
    return;
  }

  // Renderiza cada gasto
  items.forEach(expense => {
    const card = document.createElement('div');
    card.className = `expense-card ${CATEGORY_CLASSES[expense.category]}`;
    card.innerHTML = `
      <div class="expense-number">#${expense.id}</div>
      <div class="expense-name">${expense.name}</div>
      <div class="expense-amount">${formatCurrency(expense.amount)}</div>
      <div class="expense-meta">
        <span class="badge badge-category">${expense.category}</span>
        <span class="badge badge-date">📅 ${expense.date}</span>
        <span class="badge badge-priority">⚡ ${expense.priority}</span>
      </div>
    `;
    container.appendChild(card);
  });
};

// =============================================
// 7. RENDERIZAR NAVEGACIÓN
// =============================================

const renderNavigation = () => {
  const total = isFiltered
    ? Math.ceil(filteredData.length / paginator.itemsPerPage)
    : paginator.totalPages;

  const current = paginator.currentPageNum;
  const totalItems = isFiltered ? filteredData.length : paginator.totalItems;
  const start = (current - 1) * paginator.itemsPerPage + 1;
  const end = Math.min(current * paginator.itemsPerPage, totalItems);

  // Actualiza info
  document.getElementById('showing-info').textContent =
    `Mostrando ${start}-${end} gastos`;
  document.getElementById('page-indicator').textContent =
    `Página ${current} de ${total}`;
  document.getElementById('total-info').textContent =
    `Total: ${totalItems} gastos`;

  // Botones de navegación
  document.getElementById('btn-first').disabled = current === 1;
  document.getElementById('btn-prev').disabled = current === 1;
  document.getElementById('btn-next').disabled = current === total;
  document.getElementById('btn-last').disabled = current === total;

  // Números de página
  renderPageNumbers(current, total);
};

const renderPageNumbers = (current, total) => {
  const container = document.getElementById('page-numbers');
  container.innerHTML = '';

  // Muestra máximo 5 páginas
  let pages = [];
  if (total <= 5) {
    pages = Array.from({ length: total }, (_, i) => i + 1);
  } else {
    if (current <= 3) {
      pages = [1, 2, 3, 4, '...', total];
    } else if (current >= total - 2) {
      pages = [1, '...', total-3, total-2, total-1, total];
    } else {
      pages = [1, '...', current-1, current, current+1, '...', total];
    }
  }

  pages.forEach(page => {
    const btn = document.createElement('button');
    if (page === '...') {
      btn.className = 'page-btn ellipsis';
      btn.textContent = '...';
    } else {
      btn.className = `page-btn ${page === current ? 'active' : ''}`;
      btn.textContent = page;
      btn.onclick = () => goToPage(page);
    }
    container.appendChild(btn);
  });
};

// =============================================
// 8. ESTADÍSTICAS DEL GENERADOR
// =============================================

const renderGeneratorStats = () => {
  const data = isFiltered ? filteredData : paginator.allData;
  const total = data.reduce((acc, e) => acc + e.amount, 0);
  const avg = Math.round(total / data.length);

  document.getElementById('generator-stats').innerHTML = `
    <div class="gen-stat">
      <span class="gen-stat-value">${paginator.totalItems}</span>
      <span class="gen-stat-label">Total generados</span>
    </div>
    <div class="gen-stat">
      <span class="gen-stat-value">${paginator.totalPages}</span>
      <span class="gen-stat-label">Total páginas</span>
    </div>
    <div class="gen-stat">
      <span class="gen-stat-value">${paginator.itemsPerPage}</span>
      <span class="gen-stat-label">Por página</span>
    </div>
    <div class="gen-stat">
      <span class="gen-stat-value">${formatCurrency(total)}</span>
      <span class="gen-stat-label">Total gastos</span>
    </div>
    <div class="gen-stat">
      <span class="gen-stat-value">${formatCurrency(avg)}</span>
      <span class="gen-stat-label">Promedio</span>
    </div>
  `;
};

// =============================================
// 9. FUNCIONES DE NAVEGACIÓN
// =============================================

const render = () => {
  renderExpenses();
  renderNavigation();
  renderGeneratorStats();
};

const nextPage = () => {
  const total = isFiltered
    ? Math.ceil(filteredData.length / paginator.itemsPerPage)
    : paginator.totalPages;
  if (paginator.currentPageNum < total) {
    paginator.next();
    render();
  }
};

const previousPage = () => {
  if (paginator.previous()) render();
};

const goToPage = (page) => {
  if (paginator.goTo(page)) render();
};

const goToLastPage = () => {
  const total = isFiltered
    ? Math.ceil(filteredData.length / paginator.itemsPerPage)
    : paginator.totalPages;
  goToPage(total);
};

// =============================================
// 10. FILTROS Y BÚSQUEDA
// =============================================

const applyFilters = () => {
  const query = document.getElementById('search-input').value;
  const category = document.getElementById('filter-category').value;

  if (query || category !== 'all') {
    filteredData = paginator.filter(query, category);
    isFiltered = true;
  } else {
    filteredData = [];
    isFiltered = false;
  }

  paginator.currentPageNum = 1;
  render();
};

// =============================================
// 11. INICIALIZAR
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // Eventos de filtros
  document.getElementById('search-input')
    .addEventListener('input', applyFilters);
  document.getElementById('filter-category')
    .addEventListener('change', applyFilters);

  // Items por página
  document.getElementById('items-per-page')
    .addEventListener('change', (e) => {
      paginator.setItemsPerPage(Number(e.target.value));
      render();
    });

  // Renderiza inicial
  render();
  console.log('🚀 Paginador iniciado con generadores');
});