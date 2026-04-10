
// SERVICIO - ALMACENAMIENTO LOCAL

import { APP_CONFIG } from '../config.js';

// Guarda datos en localStorage
export const saveToStorage = (data) => {
  localStorage.setItem(APP_CONFIG.STORAGE_KEY, JSON.stringify(data));
};

// Carga datos desde localStorage
export const loadFromStorage = () => {
  const data = localStorage.getItem(APP_CONFIG.STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Limpia todos los datos guardados
export const clearStorage = () => {
  localStorage.removeItem(APP_CONFIG.STORAGE_KEY);
};