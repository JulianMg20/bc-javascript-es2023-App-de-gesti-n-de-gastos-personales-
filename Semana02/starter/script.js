// =============================================
// LISTA DE GASTOS
// =============================================
let gastos = [];

// Crea un gasto nuevo
const createItem = (name, description, category, amount, paymentMethod) => {
  return {
    id: Date.now(),
    name: name,
    description: description,
    active: true,
    priority: "high",
    category: category,
    amount: amount,
    date: new Date().toLocaleDateString(),
    paymentMethod: paymentMethod
  };
};

// Muestra un gasto en pantalla con botones
const renderItem = (gasto) => {
  return `
    <div class="gasto-card" id="gasto-${gasto.id}">
      <h3>${gasto.name}</h3>
      <p>${gasto.description}</p>
      <p>📁 ${gasto.category}</p>
      <p>💰 $${gasto.amount.toLocaleString()}</p>
      <p>💳 ${gasto.paymentMethod}</p>
      <p>📅 ${gasto.date}</p>
      <p>Estado: ${gasto.active ? "✅ Activo" : "❌ Inactivo"}</p>

      <button onclick="toggleItem(${gasto.id})">
        ${gasto.active ? "⏸️ Desactivar" : "▶️ Activar"}
      </button>
      <button onclick="editItem(${gasto.id})">
      ✏️ Editar
      </button>
      <button onclick="deleteItem(${gasto.id})">
        🗑️ Eliminar
      </button>
    </div>
  `;
};

// Prueba rápida en consola
const gastoPrueba = createItem(
  "Almuerzo",
  "Almuerzo en restaurante",
  "Alimentación",
  35000,
  "efectivo"
);

console.log(gastoPrueba);
console.log(renderItem(gastoPrueba));

// =============================================
// CONECTAR EL FORMULARIO
// =============================================

// Muestra todos los gastos en pantalla
const renderAllItems = () => {
  // Busca el contenedor en el HTML
  const contenedor = document.getElementById("gastos-container");

  // Si no hay gastos muestra un mensaje
  if (gastos.length === 0) {
    contenedor.innerHTML = "<p>No hay gastos aún 😊</p>";
    return;
  }

  // Recorre todos los gastos y los muestra
  contenedor.innerHTML = gastos.map(g => renderItem(g)).join("");
};

// Conectar el botón "Agregar Gasto"
const form = document.getElementById("expense-form");

form.addEventListener("submit", (e) => {
  // Evita que la página se recargue al hacer clic
  e.preventDefault();

  // Lee lo que escribió el usuario
  const name = document.getElementById("input-name").value;
  const description = document.getElementById("input-description").value;
  const category = document.getElementById("input-category").value;
  const amount = Number(document.getElementById("input-amount").value);
  const paymentMethod = document.getElementById("input-payment").value;

// Verifica si estamos editando o creando
if (editandoId !== null) {
  // Actualiza el gasto existente
  gastos = gastos.map(g =>
    g.id === editandoId
      ? { ...g, name, description, category, amount, paymentMethod }
      : g
  );
  // Resetea el modo edición
  editandoId = null;
  document.querySelector("button[type='submit']").textContent = "➕ Agregar Gasto";
} else {
  // Crea el gasto nuevo con createItem()
  const nuevoGasto = createItem(name, description, category, amount, paymentMethod);
  // Lo agrega a la lista de gastos
  gastos.push(nuevoGasto);
}

  // Guarda los gastos ← agrega esta línea aquí
  saveItems();

  // Muestra todos los gastos en pantalla
  renderAllItems();

   // Limpia el formulario
  form.reset();
});

// =============================================
// GUARDAR Y CARGAR GASTOS
// =============================================

// Guarda los gastos en el navegador
const saveItems = () => {
  // Convierte el array de gastos a texto y lo guarda
  localStorage.setItem("gastos", JSON.stringify(gastos));
  console.log("💾 Gastos guardados correctamente");
};

// Carga los gastos guardados cuando abres la app
  const loadItems = () => {
  const gastosGuardados = localStorage.getItem("gastos");
  if (gastosGuardados) {
    gastos = JSON.parse(gastosGuardados);
    console.log("📂 Gastos cargados correctamente");
  }
};
// Cambia el estado activo/inactivo de un gasto
const toggleItem = (id) => {
  // Busca el gasto por su id
  const gasto = gastos.find(g => g.id === id);

  // Cambia el estado al contrario
  gasto.active = !gasto.active;

  // Guarda y muestra los cambios
  saveItems();
  renderAllItems();
};

// Elimina un gasto de la lista
const deleteItem = (id) => {
  // Filtra todos los gastos menos el que tiene ese id
  gastos = gastos.filter(g => g.id !== id);

  // Guarda y muestra los cambios
  saveItems();
  renderAllItems();
};

// Cargar gastos al abrir la app

// =============================================
// EDICIÓN DE GASTOS
// =============================================

// Variable para saber si estamos editando
let editandoId = null;

// Llena el formulario con los datos del gasto a editar
const editItem = (id) => {
  // Busca el gasto por su id
  const gasto = gastos.find(g => g.id === id);

  // Llena el formulario con los datos del gasto
  document.getElementById("input-name").value = gasto.name;
  document.getElementById("input-description").value = gasto.description;
  document.getElementById("input-category").value = gasto.category;
  document.getElementById("input-amount").value = gasto.amount;
  document.getElementById("input-payment").value = gasto.paymentMethod;

  // Guarda el id del gasto que estamos editando
  editandoId = id;

  // Cambia el texto del botón
  document.querySelector("button[type='submit']").textContent = "💾 Guardar cambios";
};
// =============================================
// ESTADÍSTICAS
// =============================================

// Calcula y muestra las estadísticas
const renderStats = () => {
  // Total gastado con reduce
  const total = gastos.reduce((acc, g) => acc + g.amount, 0);

  // Promedio por gasto
  const promedio = gastos.length > 0 ? Math.round(total / gastos.length) : 0;

  // Gasto más alto con reduce
  const masAlto = gastos.length > 0
    ? gastos.reduce((max, g) => g.amount > max.amount ? g : max)
    : null;

  // Gastos activos e inactivos con filter
  const activos = gastos.filter(g => g.active).length;
  const inactivos = gastos.filter(g => !g.active).length;

  // Muestra las estadísticas en pantalla
  const contenedor = document.getElementById("stats-container");
  contenedor.innerHTML = `
    <div class="stats-box">
      <h2>📊 Estadísticas</h2>
      <p>💰 Total gastado: $${total.toLocaleString()}</p>
      <p>📊 Promedio por gasto: $${promedio.toLocaleString()}</p>
      <p>📈 Gasto más alto: ${masAlto ? masAlto.name + ' ($' + masAlto.amount.toLocaleString() + ')' : 'N/A'}</p>
      <p>🔢 Total de gastos: ${gastos.length}</p>
      <p>✅ Gastos activos: ${activos}</p>
      <p>❌ Gastos inactivos: ${inactivos}</p>
    </div>
  `;
};

// =============================================
// FILTROS Y BÚSQUEDA
// =============================================

// Filtra y busca gastos según criterios
const filterItems = () => {
  // Lee lo que escribió el usuario en el buscador
  const search = document.getElementById("input-search").value.toLowerCase();

  // Lee la categoría seleccionada
  const category = document.getElementById("filter-category").value;

  // Lee el estado seleccionado
  const status = document.getElementById("filter-status").value;

  // Filtra los gastos según los criterios
  const gastosFiltrados = gastos.filter(g => {
    const coincideNombre = g.name.toLowerCase().includes(search);
    const coincideCategoria = category === "todos" || g.category === category;
    const coincideEstado = status === "todos" ||
      (status === "activo" && g.active) ||
      (status === "inactivo" && !g.active);
    return coincideNombre && coincideCategoria && coincideEstado;
  });

  // Muestra solo los gastos filtrados
  const contenedor = document.getElementById("gastos-container");
  if (gastosFiltrados.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron gastos 🔍</p>";
    return;
  }
  contenedor.innerHTML = gastosFiltrados.map(g => renderItem(g)).join("");
};

// Cargar gastos al abrir la app
loadItems();
renderAllItems();
renderStats();

// Conectar filtros y búsqueda
document.getElementById("input-search").addEventListener("input", filterItems);
document.getElementById("filter-category").addEventListener("change", filterItems);
document.getElementById("filter-status").addEventListener("change", filterItems);
