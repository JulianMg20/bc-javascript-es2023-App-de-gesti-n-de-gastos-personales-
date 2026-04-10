// FORMATEADORES - UTILIDADES


// Formatea un número como moneda colombiana
export const formatCurrency = (value) => {
    return `$${Number(value).toLocaleString('es-CO')}`;
};

// Formatea una fecha a formato legible
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO');
};

// Formatea el estado del stock
export const formatStock = (quantity) => {
    if (quantity === 0) return { label: 'Sin stock', class: 'stock-out' };
    if (quantity < 10) return { label: 'Stock bajo', class: 'stock-low' };
    return { label: 'Disponible', class: 'stock-ok' };
};