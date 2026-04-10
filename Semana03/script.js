
// SISTEMA DE GASTOS PERSONALES - SEMANA 03


// Clase base abstracta para todos los gastos
class BaseItem {
  // Campos privados → solo accesibles dentro de la clase
    #id;
    #name;
    #active;
    #location;
    #dateCreated;

    constructor(name, location) {
    // Genera un id único automáticamente
    this.#id = Date.now() + Math.random();
    this.#name = name;
    this.#active = true;
    this.#location = location;
    this.#dateCreated = new Date().toLocaleDateString();
    }

  // Getters → para leer los campos privados
    get id() { return this.#id; }
    get name() { return this.#name; }
    get isActive() { return this.#active; }
    get location() { return this.#location; }
    get dateCreated() { return this.#dateCreated; }

  // Setter con validación
    set location(value) {
    if (!value || value.trim() === '') {
    throw new Error('La ubicación no puede estar vacía');
    }
    this.#location = value;
    }

  // Métodos de estado
    activate() { this.#active = true; }
    deactivate() { this.#active = false; }

  // Método abstracto → las clases hijas deben implementarlo
    getInfo() {
    throw new Error('Método getInfo() debe ser implementado');
    }

  // Retorna el tipo de la clase
    getType() {
    return this.constructor.name;
    }
}

// CLASES DERIVADAS - TIPOS DE GASTOS

// Clase para gastos de Alimentación
class FoodExpense extends BaseItem {
  // Campos privados específicos de alimentación
  #amount;
  #restaurant;

  constructor(name, location, amount, restaurant) {
    // super() llama al constructor de BaseItem
    super(name, location);
    this.#amount = amount;
    this.#restaurant = restaurant;
  }

  // Getters específicos
  get amount() { return this.#amount; }
  get restaurant() { return this.#restaurant; }

  // Implementación del método abstracto
  getInfo() {
    return `🍔 ${this.name} - $${this.#amount.toLocaleString()} en ${this.#restaurant}`;
  }
}

// =============================================
// CLASE PERSON - USUARIOS DEL SISTEMA
// =============================================

class Person {
  // Campos privados
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    this.#id = Date.now() + Math.random();
    this.#name = name;
    this.#email = email;
    this.#registrationDate = new Date().toLocaleDateString();
  }

  // Getters
  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get registrationDate() { return this.#registrationDate; }

  // Setter con validación de email
  set email(value) {
    // Verifica que el email tenga @ y .
    if (!value.includes('@') || !value.includes('.')) {
      throw new Error('Email inválido');
    }
    this.#email = value;
  }

  // Información básica de la persona
  getInfo() {
    return `👤 ${this.#name} - ${this.#email}`;
  }
}

// =============================================
// CLASES DE ROLES
// =============================================

// Usuario regular → solo ve sus propios gastos
class RegularUser extends Person {
  // Campo privado específico
  #budget;

  constructor(name, email, budget) {
    // Llama al constructor de Person
    super(name, email);
    this.#budget = budget;
  }

  get budget() { return this.#budget; }

  // Método específico del rol
  getInfo() {
    return `👤 ${this.name} - Presupuesto: $${this.#budget.toLocaleString()}`;
  }
}

// Usuario administrador → puede gestionar todo
class AdminUser extends Person {
  // Campo privado específico
  #accessLevel;

  constructor(name, email, accessLevel) {
    super(name, email);
    this.#accessLevel = accessLevel;
  }

  get accessLevel() { return this.#accessLevel; }

  // Método específico del rol
  getInfo() {
    return `👑 ${this.name} - Nivel de acceso: ${this.#accessLevel}`;
  }
}

// Clase para gastos de Transporte
class TransportExpense extends BaseItem {
  #amount;
  #route;

  constructor(name, location, amount, route) {
    super(name, location);
    this.#amount = amount;
    this.#route = route;
  }

  get amount() { return this.#amount; }
  get route() { return this.#route; }

  getInfo() {
    return `🚌 ${this.name} - $${this.#amount.toLocaleString()} ruta: ${this.#route}`;
  }
}

// Clase para gastos de Entretenimiento
class EntertainmentExpense extends BaseItem {
  #amount;
  #platform;

  constructor(name, location, amount, platform) {
    super(name, location);
    this.#amount = amount;
    this.#platform = platform;
  }

  get amount() { return this.#amount; }
  get platform() { return this.#platform; }

  getInfo() {
    return `🎬 ${this.name} - $${this.#amount.toLocaleString()} en ${this.#platform}`;
  }
}

// Clase para gastos de Salud
class HealthExpense extends BaseItem {
  #amount;
  #doctor;

  constructor(name, location, amount, doctor) {
    super(name, location);
    this.#amount = amount;
    this.#doctor = doctor;
  }

  get amount() { return this.#amount; }
  get doctor() { return this.#doctor; }

  getInfo() {
    return `💊 ${this.name} - $${this.#amount.toLocaleString()} con ${this.#doctor}`;
  }
}


// CLASE PRINCIPAL - SISTEMA DE GASTOS

class ExpenseSystem {
  // Campos privados
  #items = [];
  #users = [];
  #transactions = [];

  // Static block → configuración del sistema
  static {
    this.VERSION = '1.0.0';
    this.MAX_ITEMS = 1000;
    console.log(`💰 Sistema de Gastos v${ExpenseSystem.VERSION} iniciado`);
  }


  // MÉTODOS DE GASTOS


  // Agregar un gasto nuevo
  addItem(item) {
    // Verifica que sea una instancia de BaseItem
    if (!(item instanceof BaseItem)) {
      throw new Error('El elemento debe ser un gasto válido');
    }
    this.#items.push(item);

    // Registra la transacción
    this.#addTransaction('add', `Gasto agregado: ${item.name}`);
    return item;
  }

  // Eliminar un gasto por id
  removeItem(id) {
    const index = this.#items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Gasto no encontrado');
    }
    const removed = this.#items.splice(index, 1)[0];
    this.#addTransaction('remove', `Gasto eliminado: ${removed.name}`);
    return removed;
  }

  // Buscar un gasto por id
  findItem(id) {
    return this.#items.find(item => item.id === id) || null;
  }

  // Obtener todos los gastos
  getAllItems() { return [...this.#items]; }

  // Buscar gastos por nombre
  searchByName(query) {
    return this.#items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Filtrar gastos por tipo
  filterByType(type) {
    return this.#items.filter(item => item.getType() === type);
  }


  // MÉTODOS DE USUARIOS


  // Agregar un usuario
  addUser(user) {
    if (!(user instanceof Person)) {
      throw new Error('El usuario debe ser una persona válida');
    }
    this.#users.push(user);
    this.#addTransaction('add', `Usuario agregado: ${user.name}`);
    return user;
  }

  // Obtener todos los usuarios
  getAllUsers() { return [...this.#users]; }


  // ESTADÍSTICAS


  getStats() {
    const total = this.#items.reduce((acc, item) => acc + item.amount, 0);
    const active = this.#items.filter(item => item.isActive).length;
    const inactive = this.#items.filter(item => !item.isActive).length;

    return {
      total: this.#items.length,
      active,
      inactive,
      users: this.#users.length,
      totalAmount: total
    };
  }


  // TRANSACCIONES


  // Método privado para registrar transacciones
  #addTransaction(type, description) {
    this.#transactions.push({
      type,
      description,
      date: new Date().toLocaleString()
    });
  }

  // Obtener todas las transacciones
  getAllTransactions() { return [...this.#transactions]; }
}


// INTEGRACIÓN CON DOM


// Crear instancia del sistema
const sistema = new ExpenseSystem();


// UTILIDADES


// Mostrar notificación toast
const showToast = (message, type = 'success') => {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};


// NAVEGACIÓN - PESTAÑAS


const initTabs = () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Desactiva todos
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Activa el seleccionado
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
};


// RENDERIZAR GASTOS


const renderItems = (items = sistema.getAllItems()) => {
  const list = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');

  if (items.length === 0) {
    list.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  list.innerHTML = items.map(item => `
    <div class="item-card">
      <div class="item-card-header">
        <span class="item-type ${item.getType()}">${item.getType()}</span>
        <span class="availability-badge ${item.isActive ? 'available' : 'unavailable'}">
          ${item.isActive ? '✅ Activo' : '❌ Inactivo'}
        </span>
      </div>
      <h3 class="item-title">${item.name}</h3>
      <div class="item-details">
        <p>💰 $${item.amount.toLocaleString()}</p>
        <p>📁 ${item.location}</p>
        <p>📅 ${item.dateCreated}</p>
        <p>ℹ️ ${item.getInfo()}</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-small ${item.isActive ? 'btn-warning' : 'btn-success'}"
          onclick="toggleItemStatus('${item.id}')">
          ${item.isActive ? '⏸️ Desactivar' : '▶️ Activar'}
        </button>
        <button class="btn btn-small btn-danger"
          onclick="deleteItem('${item.id}')">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `).join('');
};


// RENDERIZAR USUARIOS


const renderUsers = () => {
  const list = document.getElementById('user-list');
  const users = sistema.getAllUsers();

  if (users.length === 0) {
    list.innerHTML = '<p style="color: var(--text-muted); padding: 20px;">No hay usuarios registrados</p>';
    return;
  }

  list.innerHTML = users.map(user => `
    <div class="user-card">
      <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
      <h3 class="user-name">${user.name}</h3>
      <p class="user-email">${user.email}</p>
      <span class="role-badge ${user.getType()}">${user.getType()}</span>
    </div>
  `).join('');
};


// RENDERIZAR TRANSACCIONES


const renderTransactions = () => {
  const list = document.getElementById('transaction-list');
  const transactions = sistema.getAllTransactions();

  if (transactions.length === 0) {
    list.innerHTML = '<p style="color: var(--text-muted); padding: 20px;">No hay transacciones aún</p>';
    return;
  }

  list.innerHTML = transactions.map(t => `
    <div class="transaction-card">
      <div class="transaction-info">
        <p>${t.description}</p>
        <p>📅 ${t.date}</p>
      </div>
      <span class="transaction-type ${t.type}">${t.type}</span>
    </div>
  `).join('');
};


// RENDERIZAR ESTADÍSTICAS


const renderStats = () => {
  const stats = sistema.getStats();
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;
  document.getElementById('stat-users').textContent = stats.users;

  document.getElementById('stats-details').innerHTML = `
    <div class="stats-breakdown">
      <h3>💰 Resumen Financiero</h3>
      <div class="breakdown-grid">
        <div class="breakdown-item">
          <span class="breakdown-type">Total gastado</span>
          <span class="breakdown-count">$${stats.totalAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
};

// Función para renderizar todo
const renderAll = () => {
  renderItems();
  renderUsers();
  renderTransactions();
  renderStats();
};


// ACCIONES DE GASTOS


const toggleItemStatus = (id) => {
  const item = sistema.findItem(id);
  if (item.isActive) {
    item.deactivate();
    showToast('❌ Gasto desactivado', 'info');
  } else {
    item.activate();
    showToast('✅ Gasto activado', 'success');
  }
  renderAll();
};

const deleteItem = (id) => {
  sistema.removeItem(id);
  showToast('🗑️ Gasto eliminado', 'error');
  renderAll();
};


// MODAL DE GASTOS


const initItemModal = () => {
  const modal = document.getElementById('item-modal');
  const addBtn = document.getElementById('add-item-btn');
  const closeBtn = document.getElementById('close-modal');
  const cancelBtn = document.getElementById('cancel-btn');
  const form = document.getElementById('item-form');

  // Abrir modal
  addBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  // Cerrar modal
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

  // Guardar gasto
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('item-type').value;
    const name = document.getElementById('item-name').value;
    const location = document.getElementById('item-location').value;
    const amount = Number(document.getElementById('item-amount').value);

    // Crea el gasto según el tipo seleccionado
    let newItem;
    if (type === 'FoodExpense') {
      newItem = new FoodExpense(name, location, amount, location);
    } else if (type === 'TransportExpense') {
      newItem = new TransportExpense(name, location, amount, location);
    } else if (type === 'EntertainmentExpense') {
      newItem = new EntertainmentExpense(name, location, amount, location);
    } else {
      newItem = new HealthExpense(name, location, amount, location);
    }

    sistema.addItem(newItem);
    showToast('✅ Gasto agregado correctamente', 'success');
    modal.classList.remove('active');
    form.reset();
    renderAll();
  });
};


// MODAL DE USUARIOS


const initUserModal = () => {
  const modal = document.getElementById('user-modal');
  const addBtn = document.getElementById('add-user-btn');
  const closeBtn = document.getElementById('close-user-modal');
  const cancelBtn = document.getElementById('cancel-user-btn');
  const form = document.getElementById('user-form');

  addBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const role = document.getElementById('user-role').value;
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;

    let newUser;
    if (role === 'RegularUser') {
      newUser = new RegularUser(name, email, 500000);
    } else {
      newUser = new AdminUser(name, email, 'full');
    }

    sistema.addUser(newUser);
    showToast('✅ Usuario agregado correctamente', 'success');
    modal.classList.remove('active');
    form.reset();
    renderAll();
  });
};


// FILTROS Y BÚSQUEDA


const initFilters = () => {
  const searchInput = document.getElementById('search-input');
  const filterType = document.getElementById('filter-type');
  const filterStatus = document.getElementById('filter-status');

  const applyFilters = () => {
    let items = sistema.getAllItems();
    const search = searchInput.value.toLowerCase();
    const type = filterType.value;
    const status = filterStatus.value;

    if (search) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(search)
      );
    }
    if (type !== 'all') {
      items = items.filter(item => item.getType() === type);
    }
    if (status !== 'all') {
      items = items.filter(item =>
        status === 'active' ? item.isActive : !item.isActive
      );
    }
    renderItems(items);
  };

  searchInput.addEventListener('input', applyFilters);
  filterType.addEventListener('change', applyFilters);
  filterStatus.addEventListener('change', applyFilters);
};


// INICIALIZAR TODO


document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initItemModal();
  initUserModal();
  initFilters();
  renderAll();
  console.log('✅ Sistema inicializado correctamente');
});