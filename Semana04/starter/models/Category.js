// MODELO - CATEGORÍA

export class Category {
  constructor({ id, name, emoji }) {
    // Destructuring en el constructor ✅
    this.id = id;
    this.name = name;
    this.emoji = emoji;
  }

  // Retorna el nombre completo con emoji
  get fullName() {
    return `${this.emoji} ${this.name}`;
  }
}