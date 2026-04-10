// VALIDADOR DE FORMULARIO - SEMANA 06

// 1. PATRONES RegExp


const patterns = {
  // Solo letras y espacios, 2-50 caracteres
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,

  // Formato email estándar
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Teléfono colombiano: +57 seguido de 10 dígitos
  phone: /^\+57\s?\d{3}\s?\d{3}\s?\d{4}$/,

  // Contraseña: mín 8 chars, mayúscula, minúscula, número, especial
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,

  // Fecha DD/MM/YYYY
  date: /^(?<day>\d{2})\/(?<month>\d{2})\/(?<year>\d{4})$/,

  // Monto: número positivo
  amount: /^\d+(\.\d{1,2})?$/,

  // Descripción: 3-100 caracteres
  description: /^.{3,100}$/
};


// 2. SANITIZACIÓN


// Elimina caracteres peligrosos para prevenir XSS
const sanitizeInput = (input) => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};


// 3. MEDIDOR DE FORTALEZA DE CONTRASEÑA


const getPasswordStrength = (password) => {
  let score = 0;

  // Criterios de fortaleza
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  // Retorna nivel según score
  if (score <= 2) return { level: 'weak', label: '🔴 Débil', class: 'strength-weak' };
  if (score <= 3) return { level: 'regular', label: '🟡 Regular', class: 'strength-regular' };
  if (score <= 4) return { level: 'good', label: '🔵 Buena', class: 'strength-good' };
  return { level: 'strong', label: '🟢 Fuerte', class: 'strength-strong' };
};


// 4. VALIDADORES


const validators = {

  // Valida nombre
  validateName(value) {
    const sanitized = sanitizeInput(value.trim());
    if (!sanitized) return { isValid: false, message: '❌ El nombre es obligatorio' };
    if (!patterns.name.test(sanitized)) {
      return { isValid: false, message: '❌ Solo letras y espacios, entre 2 y 50 caracteres' };
    }
    return { isValid: true, message: '✅ Nombre válido' };
  },

  // Valida email
  validateEmail(value) {
    const sanitized = sanitizeInput(value.trim());
    if (!sanitized) return { isValid: false, message: '❌ El email es obligatorio' };
    if (!patterns.email.test(sanitized)) {
      return { isValid: false, message: '❌ Formato inválido. Ej: juan@gmail.com' };
    }
    return { isValid: true, message: '✅ Email válido' };
  },

  // Valida teléfono
  validatePhone(value) {
    const sanitized = sanitizeInput(value.trim());
    if (!sanitized) return { isValid: false, message: '❌ El teléfono es obligatorio' };
    if (!patterns.phone.test(sanitized)) {
      return { isValid: false, message: '❌ Formato: +57 300 123 4567' };
    }
    return { isValid: true, message: '✅ Teléfono válido' };
  },

  // Valida contraseña
  validatePassword(value) {
    if (!value) return { isValid: false, message: '❌ La contraseña es obligatoria' };
    if (value.length < 8) {
      return { isValid: false, message: '❌ Mínimo 8 caracteres' };
    }
    if (!patterns.password.test(value)) {
      return { isValid: false, message: '❌ Necesita mayúscula, minúscula, número y símbolo' };
    }
    return { isValid: true, message: '✅ Contraseña válida' };
  },

  // Valida confirmación de contraseña
  validateConfirm(value, password) {
    if (!value) return { isValid: false, message: '❌ Confirma tu contraseña' };
    if (value !== password) {
      return { isValid: false, message: '❌ Las contraseñas no coinciden' };
    }
    return { isValid: true, message: '✅ Las contraseñas coinciden' };
  },

  // Valida fecha
  validateDate(value) {
    if (!value) return { isValid: false, message: '❌ La fecha es obligatoria' };
    const match = value.match(patterns.date);
    if (!match) {
      return { isValid: false, message: '❌ Formato: DD/MM/YYYY' };
    }
    // Extrae día, mes y año con grupos nombrados
    const { day, month, year } = match.groups;
    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date.getTime())) {
      return { isValid: false, message: '❌ Fecha inválida' };
    }
    if (date > new Date()) {
      return { isValid: false, message: '❌ La fecha no puede ser futura' };
    }
    return { isValid: true, message: `✅ Fecha válida: ${day}/${month}/${year}` };
  },

  // Valida monto
  validateAmount(value) {
    const sanitized = sanitizeInput(value.trim());
    if (!sanitized) return { isValid: false, message: '❌ El monto es obligatorio' };
    if (!patterns.amount.test(sanitized)) {
      return { isValid: false, message: '❌ Solo números positivos. Ej: 35000' };
    }
    if (Number(sanitized) <= 0) {
      return { isValid: false, message: '❌ El monto debe ser mayor a 0' };
    }
    return { isValid: true, message: `✅ Monto: $${Number(sanitized).toLocaleString('es-CO')}` };
  },

  // Valida categoría
  validateCategory(value) {
    if (!value) return { isValid: false, message: '❌ Selecciona una categoría' };
    return { isValid: true, message: '✅ Categoría seleccionada' };
  },

  // Valida descripción
  validateDescription(value) {
    const sanitized = sanitizeInput(value.trim());
    if (!sanitized) return { isValid: false, message: '❌ La descripción es obligatoria' };
    if (!patterns.description.test(sanitized)) {
      return { isValid: false, message: '❌ Entre 3 y 100 caracteres' };
    }
    return { isValid: true, message: '✅ Descripción válida' };
  }
};


// 5. FORMATEO AUTOMÁTICO


// Formatea el teléfono mientras escribe
const formatPhone = (value) => {
  // Elimina todo excepto dígitos y +
  let cleaned = value.replace(/[^\d+]/g, '');

  // Agrega +57 si empieza con 57 o 3
  if (cleaned.startsWith('57')) cleaned = '+' + cleaned;
  if (cleaned.startsWith('3')) cleaned = '+57' + cleaned;

  // Formato: +57 300 123 4567
  const match = cleaned.match(/^(\+57)(\d{3})(\d{3})(\d{4})$/);
  if (match) return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;

  return cleaned;
};

// Formatea la fecha mientras escribe
const formatDate = (value) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return `${cleaned.slice(0,2)}/${cleaned.slice(2)}`;
  return `${cleaned.slice(0,2)}/${cleaned.slice(2,4)}/${cleaned.slice(4,8)}`;
};


// 6. MOSTRAR FEEDBACK EN PANTALLA


const showFeedback = (groupId, isValid, message) => {
  const group = document.getElementById(groupId);
  const feedback = document.getElementById(`feedback-${groupId.replace('group-', '')}`);

  group.classList.remove('valid', 'invalid', 'shake');

  if (message) {
    group.classList.add(isValid ? 'valid' : 'invalid');
    if (!isValid) {
      // Efecto shake en campo inválido
      setTimeout(() => group.classList.add('shake'), 10);
      setTimeout(() => group.classList.remove('shake'), 310);
    }
    feedback.textContent = message;
  }
};


// 7. ESTADO DEL FORMULARIO


// Guarda el estado de validación de cada campo
const formState = {
  name: false,
  email: false,
  phone: false,
  password: false,
  confirm: false,
  date: false,
  amount: false,
  category: false,
  description: false
};

// Verifica si todos los campos son válidos
const checkFormValidity = () => {
  const allValid = Object.values(formState).every(v => v === true);
  document.getElementById('btn-submit').disabled = !allValid;
};


// 8. EVENT LISTENERS


document.addEventListener('DOMContentLoaded', () => {

  // Nombre
  document.getElementById('name').addEventListener('input', (e) => {
    const { isValid, message } = validators.validateName(e.target.value);
    showFeedback('group-name', isValid, message);
    formState.name = isValid;
    checkFormValidity();
  });

  // Email
  document.getElementById('email').addEventListener('input', (e) => {
    const { isValid, message } = validators.validateEmail(e.target.value);
    showFeedback('group-email', isValid, message);
    formState.email = isValid;
    checkFormValidity();
  });

  // Teléfono con formateo automático
  document.getElementById('phone').addEventListener('input', (e) => {
    e.target.value = formatPhone(e.target.value);
    const { isValid, message } = validators.validatePhone(e.target.value);
    showFeedback('group-phone', isValid, message);
    formState.phone = isValid;
    checkFormValidity();
  });

  // Contraseña con medidor de fortaleza
  document.getElementById('password').addEventListener('input', (e) => {
    const value = e.target.value;
    const { isValid, message } = validators.validatePassword(value);
    showFeedback('group-password', isValid, message);
    formState.password = isValid;

    // Actualiza medidor de fortaleza
    const group = document.getElementById('group-password');
    const strengthLabel = document.getElementById('strength-label');
    group.classList.remove('strength-weak', 'strength-regular', 'strength-good', 'strength-strong');

    if (value) {
      const { label, class: strengthClass } = getPasswordStrength(value);
      group.classList.add(strengthClass);
      strengthLabel.textContent = label;
    } else {
      strengthLabel.textContent = '';
    }

    checkFormValidity();
  });

  // Confirmar contraseña
  document.getElementById('confirm').addEventListener('input', (e) => {
    const password = document.getElementById('password').value;
    const { isValid, message } = validators.validateConfirm(e.target.value, password);
    showFeedback('group-confirm', isValid, message);
    formState.confirm = isValid;
    checkFormValidity();
  });

  // Fecha con formateo automático
  document.getElementById('date').addEventListener('input', (e) => {
    e.target.value = formatDate(e.target.value);
    const { isValid, message } = validators.validateDate(e.target.value);
    showFeedback('group-date', isValid, message);
    formState.date = isValid;
    checkFormValidity();
  });

  // Monto
  document.getElementById('amount').addEventListener('input', (e) => {
    const { isValid, message } = validators.validateAmount(e.target.value);
    showFeedback('group-amount', isValid, message);
    formState.amount = isValid;
    checkFormValidity();
  });

  // Categoría
  document.getElementById('category').addEventListener('change', (e) => {
    const { isValid, message } = validators.validateCategory(e.target.value);
    showFeedback('group-category', isValid, message);
    formState.category = isValid;
    checkFormValidity();
  });

  // Descripción
  document.getElementById('description').addEventListener('input', (e) => {
    const { isValid, message } = validators.validateDescription(e.target.value);
    showFeedback('group-description', isValid, message);
    formState.description = isValid;
    checkFormValidity();
  });

  // Submit
  document.getElementById('expense-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const successMsg = document.getElementById('success-message');
    successMsg.classList.remove('hidden');
    setTimeout(() => successMsg.classList.add('hidden'), 3000);
    e.target.reset();
    Object.keys(formState).forEach(key => formState[key] = false);
    checkFormValidity();
    document.querySelectorAll('.form-group').forEach(g => {
      g.classList.remove('valid', 'invalid');
    });
    document.querySelectorAll('.feedback').forEach(f => f.textContent = '');
    document.getElementById('strength-label').textContent = '';
  });

});