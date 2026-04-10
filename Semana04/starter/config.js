// CONFIGURACIÓN - APP DE GASTOS PERSONALES

// Categorías de gastos con sus propiedades
export const CATEGORIES = {
    FOOD: { 
    id: 'food', 
    name: 'Alimentación', 
    emoji: '🍔' 
    },
    TRANSPORT: { 
    id: 'transport', 
    name: 'Transporte', 
    emoji: '🚌' 
    },
    ENTERTAINMENT: { 
    id: 'entertainment', 
    name: 'Entretenimiento', 
    emoji: '🎬' 
    },
    HEALTH: { 
    id: 'health', 
    name: 'Salud', 
    emoji: '💊' 
    },
};

// Configuración general de la app
export const APP_CONFIG = {
    APP_NAME: 'Gestor de Gastos Personales',
    STORAGE_KEY: 'gastos_data',
    LOW_BUDGET_THRESHOLD: 50000,
};