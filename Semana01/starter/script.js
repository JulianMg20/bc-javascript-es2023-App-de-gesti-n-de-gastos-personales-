// Datos fijos de la app (const)
const nombreApp = "App de Gastos Personales";
const codigo = "EXP-001";
const descripcion = "Control de gastos del mes de Febrero";

// Datos que pueden cambiar (let)
let totalGastado = 0;
let temaOscuro = false;
let mesActual = "Febrero 2025";

// ✅ Uso de console.log para mostrar informacion
console.log(nombreApp);
console.log(totalGastado);


// ✅ Template literals
console.log(`Bienvenido a ${nombreApp}`);
console.log(`Mes: ${mesActual}`);
console.log(`Código: ${codigo}`);
console.log(`Total gastado: $${totalGastado}`);

// ✅ Arrow functions
const mostrarResumen = () => {
  console.log(`📊 Resumen de ${mesActual}`);
  console.log(`💰 Total gastado: $${totalGastado}`);
  console.log(`🌙 Tema oscuro: ${temaOscuro}`);
};

mostrarResumen();

// ✅ Destructuring
const gasto = {
  categoria: "Alimentación",
  valor: 150000,
  fecha: "Febrero 2025"
};

const { categoria, valor, fecha } = gasto;

console.log(`📦 Categoría: ${categoria}`);
console.log(`💵 Valor: $${valor}`);
console.log(`📅 Fecha: ${fecha}`);

// ✅ Optional chaining (?.)
const usuario = {
  nombre: "Julian",
  perfil: {
    plan: "Premium"
  }
};

console.log(`👤 Usuario: ${usuario?.nombre}`);
console.log(`⭐ Plan: ${usuario?.perfil?.plan}`);
console.log(`📧 Email: ${usuario?.contacto?.email}`); // no existe, retorna undefined

// ✅ Nullish coalescing (??)
const presupuesto = null;
const categoria2 = undefined;
const limite = 500000;

console.log(`💰 Presupuesto: ${presupuesto ?? "Sin presupuesto definido"}`);
console.log(`📦 Categoría: ${categoria2 ?? "Sin categoría"}`);
console.log(`🔒 Límite: ${limite ?? "Sin límite"}`);