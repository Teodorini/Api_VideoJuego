import { Character } from "./Character";


export class Mage extends Character {
    private _magicPower: number; //Cantidad de poder para lanzar hechizos
    private _mana: number; //recursos disponibles para lanzar hechizos.

    constructor(name: string, level: number, health: number, magicPower: number, mana: number) {
        super(name, level, health);  // Llamada al constructor de la clase base
        this._magicPower = magicPower;
        this._mana = mana;
    }
    //Metodos set
    public get magicPower(): number {
      return this._magicPower;
    }

    public get mana(): number {
      return this._mana;
    }

    //Sets
    public set magicPower(magicPower: number) {
      if (magicPower > 0) {
          this._magicPower = magicPower;
      } else {
          console.log("El poder mágico debe ser mayor a cero.");
      }
  }

  public set mana(mana: number) {
      if (mana >= 0) {
          this._mana = mana;
      } else {
          console.log("El maná no puede ser negativo.");
      }
  }

  // Método para lanzar un hechizo
  public castSpell(opponent: Character): void {
      if (this._mana > 0) {  // Verifica si el Mage tiene maná suficiente
          const damage = this._magicPower;  // El daño que el Mage hace con su hechizo
          opponent.health -= damage;  // Reducir la salud del oponente
          this._mana -= 10;  // El Mage gasta 10 de maná por hechizo
          console.log(`${this.name} lanza un hechizo e inflige ${damage} puntos de daño a ${opponent.name}.`);
      } else {
          console.log(`${this.name} no tiene suficiente maná para lanzar un hechizo.`);
      }
  }

  // Método para recargar maná
  public rechargeMana(amount: number): void {
      if (amount > 0) {
          this._mana += amount;  // Recarga el maná del Mage
          console.log(`${this.name} recarga ${amount} puntos de maná. Maná actual: ${this._mana}`);
      } else {
          console.log("La cantidad de maná a recargar debe ser mayor a cero.");
      }
  }

  // Método específico para el Mage: meditar para recuperar maná
  public meditate(): void {
      const manaRecovered = 20;
      this._mana += manaRecovered;  // Recarga 20 puntos de maná
      console.log(`${this.name} medita y recupera ${manaRecovered} puntos de maná. Maná actual: ${this._mana}`);
  }

  
}


