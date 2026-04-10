# 💰 Gestor de Gastos Personales - Semana 04

## 📋 Información
- **Nombre**: Julian Machado
- **Fecha**: 29/03/2026
- **Dominio Asignado**: App de Gastos Personales
- **Semana**: 04 - Sistema Modular con ES2023 Modules

## 🎯 Descripción
Sistema modular de gestión de gastos personales construido con 
arquitectura ES2023 Modules. Permite agregar, editar, eliminar 
y filtrar gastos por categoría, con reportes cargados bajo demanda 
usando Dynamic Imports.

## 🗂️ Estructura del Proyecto
```
starter/
├── main.js              → Punto de entrada
├── config.js            → Configuración y categorías
├── models/
│   ├── BaseEntity.js    → Clase base de gastos
│   ├── Category.js      → Clase de categorías
│   └── index.js         → Barrel export
├── services/
│   ├── storage.js       → LocalStorage
│   ├── manager.js       → Lógica principal
│   └── index.js         → Barrel export
├── features/
│   └── reports.js       → Reportes (Dynamic Import)
├── ui/
│   ├── render.js        → Renderizado DOM
│   ├── events.js        → Event handlers
│   └── index.js         → Barrel export
└── utils/
    ├── formatters.js    → Formateadores
    ├── validators.js    → Validadores
    └── index.js         → Barrel export
```

## 📚 Conceptos ES2023 Aplicados
- [x] Named exports → `export const formatCurrency = ...`
- [x] Default exports → `export default class BaseEntity`
- [x] Barrel exports → `export * from './formatters.js'`
- [x] Dynamic imports → `await import('./features/reports.js')`
- [x] Destructuring en parámetros → `({ name, category, price })`
- [x] Destructuring en retornos → `const { total, average } = getStatistics()`
- [x] Destructuring en iteraciones → `items.map(({ id, name }) => ...)`
- [x] Destructuring con valores por defecto → `{ quantity = 0 }`

## 🚀 Cómo Ejecutar
1. Abrir la carpeta `Semana04` en VSCode
2. Clic derecho en `index.html`
3. Seleccionar **Open with Live Server**

## 🎯 Funcionalidades
- ✅ Agregar gastos con categoría y monto
- ✅ Editar gastos existentes
- ✅ Eliminar gastos
- ✅ Buscar por nombre
- ✅ Filtrar por categoría y stock
- ✅ Persistencia en localStorage
- ✅ Reportes con Dynamic Import
- ✅ Estadísticas en tiempo real

