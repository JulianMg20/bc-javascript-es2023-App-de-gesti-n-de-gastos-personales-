// =============================================
// UI - EVENTOS
// =============================================

import { addItem, removeItem, updateItem, searchItems, getAllItems } from '../services/index.js';
import { renderItems } from './render.js';

// Inicializa el formulario de agregar gasto
export const initForm = () => {
  const form = document.getElementById('product-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Destructuring del formulario
    const { name, category, price, quantity } = Object.fromEntries(
      new FormData(form)
    );

    try {
      addItem({
        name,
        category,
        price: Number(price),
        quantity: Number(quantity)
      });
      renderItems();
      form.reset();
      alert('✅ Gasto agregado correctamente');
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  });
};

// Inicializa los filtros
export const initFilters = () => {
  const search = document.getElementById('search');
  const filterCategory = document.getElementById('filter-category');
  const filterStock = document.getElementById('filter-stock');

  const applyFilters = () => {
    const items = searchItems({
      name: search.value,
      category: filterCategory.value,
      stock: filterStock.value
    });
    renderItems(items);
  };

  search.addEventListener('input', applyFilters);
  filterCategory.addEventListener('change', applyFilters);
  filterStock.addEventListener('change', applyFilters);
};

// Inicializa el modal de edición
export const initModal = () => {
  const modal = document.getElementById('edit-modal');
  const closeBtn = document.getElementById('modal-close');
  const cancelBtn = document.getElementById('cancel-edit');
  const editForm = document.getElementById('edit-form');

  // Cerrar modal
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

  // Guardar cambios
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = Number(document.getElementById('edit-id').value);
    const updates = {
      name: document.getElementById('edit-name').value,
      category: document.getElementById('edit-category').value,
      price: Number(document.getElementById('edit-price').value),
      quantity: Number(document.getElementById('edit-quantity').value)
    };
    updateItem(id, updates);
    renderItems();
    modal.classList.add('hidden');
    alert('✅ Gasto actualizado correctamente');
  });

  // Función global para editar
  window.editItem = (id) => {
    const items = getAllItems();
    const item = items.find(i => String(i.id) === String(id));
    if (!item) return;

    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-category').value = item.category;
    document.getElementById('edit-price').value = item.price;
    document.getElementById('edit-quantity').value = item.quantity;
    modal.classList.remove('hidden');
  };

  // Función global para eliminar
  window.deleteItem = (id) => {
    if (confirm('¿Seguro que quieres eliminar este gasto?')) {
      removeItem(Number(id));
      renderItems();
    }
  };
};