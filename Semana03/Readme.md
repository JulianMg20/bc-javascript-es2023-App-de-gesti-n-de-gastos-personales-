# 💰 Sistema de Gastos Personales - Erick Granados

## 📋 Información
- **Nombre**: Julian Machado
- **Fecha**: 15/03/2026
- **Dominio Asignado**: App de Gastos Personales
- **Entidad Principal**: Sistema de gestión de gastos con POO

## 🎯 Descripción
Sistema web interactivo para gestionar gastos personales usando
Programación Orientada a Objetos. Permite agregar, filtrar y
eliminar gastos por categoría, gestionar usuarios y ver
estadísticas en tiempo real.

## 🏗️ Arquitectura de Clases
```
BaseItem (clase base abstracta)
├── FoodExpense        → gastos de Alimentación
├── TransportExpense   → gastos de Transporte
├── EntertainmentExpense → gastos de Entretenimiento
└── HealthExpense      → gastos de Salud

Person (clase base)
├── RegularUser        → usuario con presupuesto
└── AdminUser          → administrador del sistema

ExpenseSystem (clase principal)
├── addItem()          → agregar gasto
├── removeItem()       → eliminar gasto
├── getStats()         → estadísticas
└── getAllTransactions() → historial
```

## 📚 Conceptos POO Aplicados
- [x] Clases con campos privados `#`
- [x] Herencia con `extends` y `super()`
- [x] Encapsulación con getters y setters
- [x] Métodos abstractos
- [x] Static blocks
- [x] Métodos estáticos
- [x] Integración con DOM

## 🚀 Cómo Ejecutar
1. Abrir la carpeta `starter` en VSCode
2. Clic derecho en `index.html`
3. Seleccionar **Open with Live Server**

## 🎯 Funcionalidades
- ✅ Agregar gastos por categoría
- ✅ Desactivar/Activar gastos
- ✅ Eliminar gastos
- ✅ Filtrar por tipo y estado
- ✅ Buscar por nombre
- ✅ Gestionar usuarios
- ✅ Ver estadísticas en tiempo real
- ✅ Historial de transacciones

