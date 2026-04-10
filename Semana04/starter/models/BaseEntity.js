// MODELO BASE - ENTIDAD PRINCIPAL

import { CATEGORIES } from '../config.js';

// Clase base para todos los gastos
export default class BaseEntity {
    constructor({ name, category, price, quantity = 1 }) {
        // Destructuring en el constructor ✅
        this.id = Date.now() + Math.random();
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.createdAt = new Date().toISOString();
        this.active = true;
}

  // Calcula el total del gasto
    get total() {
    return this.price * this.quantity;
    }

  // Retorna el tipo de la clase
    get type() {
    return this.constructor.name;
    }

  // Convierte el objeto a formato simple
    toJSON() {
        return {
        id: this.id,
        name: this.name,
        category: this.category,
        price: this.price,
        quantity: this.quantity,
        createdAt: this.createdAt,
        active: this.active
        };
    }
}