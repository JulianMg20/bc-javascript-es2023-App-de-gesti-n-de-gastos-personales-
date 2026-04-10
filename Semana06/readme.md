# 💰 Validador de Gastos Personales - Semana 06

## 📋 Información
- **Nombre**: Julian Machado
- **Fecha**: 04/04/2026
- **Dominio Asignado**: App de Gastos Personales
- **Semana**: 06 - Validador de Formularios con RegExp

## 🎯 Descripción
Formulario de registro de gastos personales con validación
en tiempo real usando Expresiones Regulares (RegExp).
Incluye medidor de fortaleza de contraseña, formateo
automático de teléfono y fecha, y sanitización de inputs.

## 🔍 Validaciones Implementadas

| Campo | Patrón RegExp | Descripción |
|-------|--------------|-------------|
| Nombre | `/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/` | Solo letras y espacios |
| Email | `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` | Formato estándar |
| Teléfono | `/^\+57\s?\d{3}\s?\d{3}\s?\d{4}$/` | Formato colombiano |
| Contraseña | `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/` | Mín 8 chars |
| Fecha | `/^(?<day>\d{2})\/(?<month>\d{2})\/(?<year>\d{4})$/` | DD/MM/YYYY |
| Monto | `/^\d+(\.\d{1,2})?$/` | Números positivos |
| Descripción | `/^.{3,100}$/` | Entre 3 y 100 chars |

## 📚 Conceptos Aplicados
- [x] Patrones RegExp para validación
- [x] Grupos nombrados `(?<name>...)` en RegExp
- [x] Validación en tiempo real con eventos
- [x] Medidor de fortaleza de contraseña
- [x] Formateo automático de teléfono y fecha
- [x] Sanitización de inputs contra XSS
- [x] Feedback visual verde/rojo por campo
- [x] Botón deshabilitado hasta validación completa

## 🚀 Cómo Ejecutar
1. Abrir la carpeta `Semana06` en VSCode
2. Clic derecho en `index.html`
3. Seleccionar **Open with Live Server**

## 🎯 Funcionalidades
- ✅ Validación en tiempo real
- ✅ Mensajes de error específicos
- ✅ Medidor de fortaleza de contraseña
- ✅ Formateo automático de teléfono
- ✅ Formateo automático de fecha
- ✅ Sanitización contra XSS
- ✅ Botón activo solo cuando todo es válido
- ✅ Mensaje de éxito al registrar

