// =============================================
// SERVICIO - GESTOR PRINCIPAL
// =============================================

import { BaseEntity } from '../models/index.js';
import { saveToStorage, loadFromStorage } from './storage.js';
import { validateName, validatePrice, validateQuantity } from '../utils/index.js';

// Lista de gastos en memoria
let items = loadFromStorage();

// Agregar un gasto nuevo
export const addItem = ({ name, category, price, quantity }) => {
  // Validaciones
  validateName(name);
  validatePrice(price);
  validateQuantity(quantity);

  // Crear nuevo gasto con destructuring
  const newItem = new BaseEntity({ name, category, price, quantity });
  items = [...items, newItem];
  saveToStorage(items);
  return newItem;
};

// Obtener todos los gastos
export const getAllItems = () => [...items];

// Eliminar un gasto por id
export const removeItem = (id) => {
  items = items.filter(item => item.id !== id);
  saveToStorage(items);
};

// Actualizar un gasto
export const updateItem = (id, updates) => {
  items = items.map(item =>
    item.id === id ? { ...item, ...updates } : item
  );
  saveToStorage(items);
};

// Buscar gastos por nombre
export const searchItems = (query) => {
  const { name = '', category = '', stock = '' } = query;
  return items.filter(item => {
    const matchName = item.name.toLowerCase().includes(name.toLowerCase());
    const matchCategory = !category || item.category === category;
    return matchName && matchCategory;
  });
};