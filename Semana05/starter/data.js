// DATOS DE GASTOS PERSONALES - SEMANA 05


export const expenseRecords = [
  {
    id: 'REG001',
    date: '2025-01-15',
    owner: 'Erick Granados',
    location: 'Bogotá',
    expenses: [
      { name: 'Almuerzo restaurante', category: 'food', amount: 35000 },
      { name: 'Café', category: 'food', amount: 8000 },
      { name: 'Bus TransMilenio', category: 'transport', amount: 5500 }
    ],
    status: 'verified'
  },
  {
    id: 'REG002',
    date: '2025-01-22',
    owner: 'Erick Granados',
    location: 'Bogotá',
    expenses: [
      { name: 'Netflix', category: 'entertainment', amount: 45000 },
      { name: 'Spotify', category: 'entertainment', amount: 20000 },
      { name: 'Taxi', category: 'transport', amount: 25000 }
    ],
    status: 'verified'
  },
  {
    id: 'REG003',
    date: '2025-02-03',
    owner: 'Erick Granados',
    location: 'Bogotá',
    expenses: [
      { name: 'Cita médica', category: 'health', amount: 80000 },
      { name: 'Medicamentos', category: 'health', amount: 45000 },
      { name: 'Domicilio comida', category: 'food', amount: 28000 }
    ],
    status: 'verified'
  },
  {
    id: 'REG004',
    date: '2025-02-14',
    owner: 'Erick Granados',
    location: 'Medellín',
    expenses: [
      { name: 'Hotel', category: 'entertainment', amount: 250000 },
      { name: 'Restaurante cena', category: 'food', amount: 85000 },
      { name: 'Tiquete avión', category: 'transport', amount: 320000 }
    ],
    status: 'verified'
  },
  {
    id: 'REG005',
    date: '2025-02-20',
    owner: 'Erick Granados',
    location: 'Bogotá',
    expenses: [
      { name: 'Mercado semana', category: 'food', amount: 180000 },
      { name: 'Gas mensual', category: 'health', amount: 65000 }
    ],
    status: 'pending'
  },
  {
    id: 'REG006',
    date: '2025-03-05',
    owner: 'Erick Granados',
    location: 'Bogotá',
    expenses: [
      { name: 'Cine', category: 'entertainment', amount: 32000 },
      { name: 'Palomitas', category: 'food', amount: 15000 },
      { name: 'Taxi regreso', category: 'transport', amount: 18000 }
    ],
    status: 'verified'
  },
  {
    id: 'REG007',
    date: '2025-03-12',
    owner: 'Erick Granados',
    location: 'Bogotá',
    expenses: [
      { name: 'Consulta odontólogo', category: 'health', amount: 120000 },
      { name: 'Almuerzo', category: 'food', amount: 22000 },
      { name: 'Bus', category: 'transport', amount: 5500 }
    ],
    status: 'verified'
  },
  {
    id: 'REG008',
    date: '2025-03-20',
    owner: 'Erick Granados',
    location: 'Bogotá',
    expenses: [
      { name: 'HBO Max', category: 'entertainment', amount: 35000 },
      { name: 'YouTube Premium', category: 'entertainment', amount: 18000 },
      { name: 'Domicilio pizza', category: 'food', amount: 55000 }
    ],
    status: 'verified'
  },
  {
    id: 'REG009',
    date: '2025-04-02',
    owner: 'Erick Granados',
    location: 'Bogotá',
    expenses: [
      { name: 'Mercado quincena', category: 'food', amount: 210000 },
      { name: 'TransMilenio mensual', category: 'transport', amount: 120000 }
    ],
    status: 'verified'
  },
  {
    id: 'REG010',
    date: '2025-04-10',
    owner: 'Erick Granados',
    location: 'Cali',
    expenses: [
      { name: 'Concierto', category: 'entertainment', amount: 150000 },
      { name: 'Restaurante', category: 'food', amount: 75000 },
      { name: 'Bus intermunicipal', category: 'transport', amount: 85000 },
      { name: 'Farmacia', category: 'health', amount: 35000 }
    ],
    status: 'verified'
  }
];

// Categorías disponibles
export const CATEGORIES = {
  food: { name: 'Alimentación', emoji: '🍔' },
  transport: { name: 'Transporte', emoji: '🚌' },
  entertainment: { name: 'Entretenimiento', emoji: '🎬' },
  health: { name: 'Salud', emoji: '💊' }
};