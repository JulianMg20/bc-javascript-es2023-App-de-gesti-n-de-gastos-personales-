// =============================================
// UI - RENDERIZADO
// =============================================

import { CATEGORIES } from '../config.js';
import { formatCurrency, formatDate, formatStock } from '../utils/index.js';
import { getAllItems } from '../services/index.js';

// Llena los selects de categorías
export const renderCategories = () => {
  const selectIds = ['category', 'filter-category', 'edit-category'];

  selectIds.forEach(selectId => {
    const select = document.getElementById(selectId);
    if (!select) return; // Si no existe, salta

    // Guarda la primera opción
    const firstOption = select.options[0]?.cloneNode(true);
    select.innerHTML = '';
    if (firstOption) select.appendChild(firstOption);

    // Agrega cada categoría
    Object.values(CATEGORIES).forEach(({ id, name, emoji }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${emoji} ${name}`;
      select.appendChild(option);
    });
  });
};

// Renderiza la tabla de gastos
export const renderItems = (items = getAllItems()) => {
  const tbody = document.getElementById('products-body');
  const count = document.getElementById('product-count');

  // Actualiza el contador
  count.textContent = `${items.length} gastos`;

  if (items.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">
          No hay gastos. ¡Agrega uno!
        </td>
      </tr>
    `;
    return;
  }

  // Renderiza cada gasto con destructuring
  tbody.innerHTML = items.map(({ id, name, category, price, quantity, createdAt }) => {
    const { label, class: stockClass } = formatStock(quantity);
    const categoryInfo = Object.values(CATEGORIES)
      .find(cat => cat.id === category) || { emoji: '📦', name: category };

    return `
      <tr>
        <td>${name}</td>
        <td>${categoryInfo.emoji} ${categoryInfo.name}</td>
        <td>${formatCurrency(price)}</td>
        <td class="${stockClass}">${quantity} (${label})</td>
        <td>${formatCurrency(price * quantity)}</td>
        <td>
          <button class="btn btn-small btn-secondary" 
            onclick="window.editItem('${id}')">
            ✏️ Editar
          </button>
          <button class="btn btn-small btn-danger" 
            onclick="window.deleteItem('${id}')">
            🗑️ Eliminar
          </button>
        </td>
      </tr>
    `;
  }).join('');
};