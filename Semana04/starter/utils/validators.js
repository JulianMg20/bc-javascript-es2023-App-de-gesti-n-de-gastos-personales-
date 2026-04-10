// VALIDADORES - UTILIDADES


// Valida que el nombre no esté vacío
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    throw new Error('El nombre no puede estar vacío');
  }
  return true;
};

// Valida que el precio sea positivo
export const validatePrice = (price) => {
  if (price <= 0) {
    throw new Error('El precio debe ser mayor a 0');
  }
  return true;
};

// Valida que la cantidad sea positiva
export const validateQuantity = (quantity) => {
  if (quantity < 0) {
    throw new Error('La cantidad no puede ser negativa');
  }
  return true;
};