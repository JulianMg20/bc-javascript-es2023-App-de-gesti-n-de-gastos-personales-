// Modelo de datos - App de Gastos Personales
const gasto = {
  id: Date.now(),           // Identificador único automático
  name: "Almuerzo",         // Nombre del gasto
    description: "Almuerzo en restaurante cerca de la oficina",
  active: true,             // ¿Está pendiente de pagar?
  priority: "high",         // Prioridad: high, medium, low
  category: "Alimentación", // Categoría del gasto
  // Propiedades específicas de gastos:
  amount: 35000,            // Monto del gasto
  date: "2025-02-26",       // Fecha del gasto
  paymentMethod: "efectivo" // Método de pago
};