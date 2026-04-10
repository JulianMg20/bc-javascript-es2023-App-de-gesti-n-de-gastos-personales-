# 💰 Sistema de Gestión con Sets y Maps - Semana 07

## 📋 Información
- **Nombre**: Julian Machado
- **Fecha**: 04/04/2026
- **Dominio Asignado**: App de Gastos Personales
- **Semana**: 07 - Sets, Maps, WeakMap y WeakSet

## 🎯 Descripción
Sistema de gestión de gastos personales que utiliza
estructuras de datos avanzadas de JavaScript ES2023.
Permite registrar gastos únicos, gestionar categorías,
trackear estados activos y cachear cálculos.

## 🗂️ Estructuras de Datos Implementadas

| Estructura | Uso en el Proyecto |
|------------|-------------------|
| **Map** | Almacena gastos por ID único |
| **Set** | Guarda categorías sin duplicados |
| **WeakSet** | Tracking de gastos activos |
| **WeakMap** | Caché de estadísticas calculadas |

## ✨ Funcionalidades

### 1. Gestión de Gastos (Map)
- Registrar gastos con ID único
- Verificar duplicados automáticamente
- Eliminar gastos por ID
- Iterar con `for...of`

### 2. Categorías Únicas (Set)
- Agregar categorías sin duplicados
- Agregar categorías personalizadas
- Visualizar todas las categorías

### 3. Operaciones de Conjuntos (Set)
- **Unión** → todas las categorías combinadas
- **Intersección** → categorías en gastos altos Y bajos
- **Diferencia** → categorías solo en gastos altos

### 4. Estados Activos (WeakSet)
- Activar/desactivar gastos
- Tracking sin memory leaks
- Visualizar gastos activos

### 5. Caché de Cálculos (WeakMap)
- Calcular estadísticas una sola vez
- Guardar en WeakMap para reutilizar
- Invalidar caché al agregar nuevos datos

## 📚 Conceptos ES2023 Aplicados
- [x] `Map` → almacenamiento clave-valor
- [x] `Set` → valores únicos
- [x] `WeakMap` → caché sin memory leaks
- [x] `WeakSet` → tracking de objetos
- [x] Operaciones de conjuntos (unión, intersección, diferencia)
- [x] Iteración con `for...of`
- [x] Spread operator con Sets y Maps

