import { Character } from "./Character";


export class Warrior extends Character {
    private _attack: number;
    private _defense: number;

    constructor(name: string, level: number, health: number, attack: number, defense: number) {
        super(name, level, health); //Llama al constructor de la clase base. 
        this._attack = attack;
        this._defense = defense; 
    }
    //gets
    public get attack(): number {
      return this._attack;
    }

    public get defense(): number {
      return this._defense;
    }

    //sets
    public set attack(attack: number) {
      if(attack > 0) {
        this._attack = attack;
      } else {
        console.log("El ataque debe ser mayor a cero.");
        
      }
    }
    public set defense(defense: number) {
      if(defense >= 0) {
        this._defense = defense;
      } else {
        console.log("La defensa no puede ser negativa.");
        
      }
    }
    // Método de combate para Warrior
  public attackOpponent(opponent: Character): void {
    if (opponent instanceof Warrior) { // Aseguramos que el oponente sea un Warrior
      const damage = this._attack - opponent.defense; // Solo Warrior tiene `defense`
      if (damage > 0) {
        // Usamos el setter de health para modificar la salud del oponente
        opponent.health -= damage;
        console.log(`${this.name} inflige ${damage} puntos de daño a ${opponent.name}`);
      } else {
        console.log(`${this.name} no puede dañar a ${opponent.name}`);
      }
    } else {
      console.log("El oponente no es un Warrior y no tiene defensa.");
    }
  }
    
// Método específico para el Warrior. Defiende
  defend() {
    console.log(`${this.name} está defendiendo con ${this._defense} puntos de defensa.`);
  }

}