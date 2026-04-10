// FEATURE - REPORTES (DYNAMIC IMPORT)

import { formatCurrency } from '../utils/index.js';

// Calcula estadísticas de los gastos
export const getStatistics = (items) => {
  // Destructuring con valores por defecto
  const total = items.reduce((acc, { price = 0, quantity = 1 }) => 
    acc + (price * quantity), 0
  );

  const average = items.length > 0 
    ? total / items.length 
    : 0;

  const maxItem = items.reduce((max, item) => 
    (item.price * item.quantity) > (max.price * max.quantity) ? item : max,
    items[0] || { price: 0, quantity: 0, name: 'N/A' }
  );

  return { total, average, max: maxItem };
};

// Genera el reporte completo
export const generateReport = (items) => {
  // Destructuring del resultado de getStatistics
  const { total, average, max } = getStatistics(items);

  // Distribución por categoría
  const byCategory = items.reduce((acc, { category, price, quantity }) => {
    acc[category] = (acc[category] || 0) + (price * quantity);
    return acc;
  }, {});

  // Gastos con stock bajo
  const lowStock = items.filter(({ quantity = 0 }) => quantity < 10);

  return {
    total,
    average,
    max,
    byCategory,
    lowStock,
    totalItems: items.length
  };
};