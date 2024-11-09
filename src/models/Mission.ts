export enum MissionType {
    Main = "Main", //Mision principal
    Side = "Side", //Mision secundaria
    Event= "Event", // Mision de evento
  }

export class Mission {
    private _description: string;
    private _difficulty: number;
    private _reward: number;
    private _type: MissionType;
    

    constructor(description: string, difficulty: number, reward: number, type: MissionType) {
        this._description = description;
        this._difficulty = difficulty;
        this._reward = reward;
        this._type = type;
        
    }
    public get description(): string {
        return this._description;
    }
    public get difficulty(): number {
        return this._difficulty;
    }
    public get reward(): number {
        return this._reward;
    }
    public get type(): MissionType {
        return this._type;
    }

    //Metodos set para mofificar los valores 
    public set description(description: string) {
        if (description && description.trim().length > 0) {
            this._description = description;
        } else {
            console.log("La descripción no puede estar vacía.");
        }
    }

    public set difficulty(difficulty: number) {
        if (difficulty >= 1 && difficulty <= 10) {
            this._difficulty = difficulty;
        } else {
            console.log("La dificultad debe estar entre 1 y 10.");
        }
    }

    public set reward(reward: number) {
        if (reward >= 0) {
            this._reward = reward;
        } else {
            console.log("La recompensa no puede ser negativa.");
        }
    }

    public set type(type: MissionType) {
        this._type = type;
    }
     
    // Método para completar la misión
     public complete(): void {
        console.log(`Misión completada: ${this._description}`);
        console.log(`Tipo de misión: ${this._type}`);
        console.log(`Dificultad: ${this._difficulty}`);
        console.log(`Recompensa obtenida: ${this._reward} puntos de experiencia.`);
    }
}