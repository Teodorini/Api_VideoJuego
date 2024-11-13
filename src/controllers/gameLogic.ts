import { Character } from "../models/Character";
import { Warrior } from "../models/Warrior";
import { Mage } from "../models/Mage";
import { Mission } from "../models/Mission";

let characters: Character[] = []; // Lista de personajes creados
let missions: Mission[] = []; // Lista de misiones disponibles

// Crea un nuevo personaje dependiendo del tipo y lo agrega a la lista
function createCharacter(name: string, level: number, health: number, type: 'warrior' | 'mage'): Character {
    let character: Character;
    if (type === 'warrior') {
        character = new Warrior(name, level, health, 10, 5);  // Valores iniciales
    } else {
        character = new Mage(name, level, health, 20, 50);  // Valores iniciales
    };
    characters.push(character);
    return character;
};

// Devuelve la lista completa de personajes en characters
function listCharacters(): Character[] {
    return characters;
};

// Busca un personaje por nombre  ene character y actualiza su nivel o salud
// si se proporcionan valores nuevos
function updateCharacter(name: string, newLevel?: number, newHealth?: number): void {
    const character = characters.find(elem => elem.name === name);
    if (character) {
        if (newLevel) character.level = newLevel;
        if (newHealth) character.health = newHealth;
    };
};

// Eliminar un personaje de la lista

function deleteCharacter(name: string): void {
    const index = characters.findIndex(elem => elem.name === name);
    if (index !== -1) {
      characters.splice(index, 1);
      console.log(`Personaje ${name} ha sido eliminado de lista con éxito`);
    } else {
      console.log(`Personaje ${name} no se encontra en la lista de personajes creados`);
    }
  }

// Asignar una misión a un personaje
function assignMission(character: Character, mission: Mission): void {
    console.log(`${character.name} ha sido asignado a la misión: ${mission.description}`);
    missions.push(mission); // Registra la misión asignada
};

// Permite completar una misión y sumar una recompensa, sino muestra un mensaje
function completeMission(character: Character, mission: Mission): boolean {
    if (character.level >= mission.difficulty) {
        console.log(`${character.name} ha completado la misión.`);
        character.experience += mission.reward;
        return true;
    } else {
        console.log(`${character.name} no tiene el nivel suficiente.`);
        return false;
    };
};

// Lista todas las misiones asignadas
function listMissions(): Mission[] {
    return missions;
}

// Función asíncrona para simular eventos aleatorios en el juego

async function triggerEvent(character: Character): Promise<void> {

    if (character.health <= 0) {
      console.error(`${character.name} no puede participar en eventos porque está muerto.`);
      return;
    };

       //Simula un evento aleatorio para un perosnaje (encuentro o recompensa)
    const event = Math.random() > 0.5 ? 'encuentro sorpresa' : 'recompensa';
    console.log(`${character.name} ha tenido un evento: ${event}`);

       //Espera 2 segundos antes de continuar
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`${character.name} ha respondido al evento.`);
  };

// Función para manejar múltiples misiones de forma secuencial usando Promesas
function acceptMissions(character: Character, missions: Mission[]): Promise<void> {
    //Se inicializa el índice de la misión actual en 0
    let currentMissionIndex = 0;

    //Se crea una promesa que se resolverá cuando todas las misiones sean completadas o cuando ocurra un error.
    return new Promise((resolve, reject) => {
        function completeNextMission() {

            //Se verifica si hay misiones pendientes en la lista.
            if (currentMissionIndex < missions.length) {
                //para completar la misión actual
                const mission = missions[currentMissionIndex];
                if (completeMission(character, mission)) {
                    console.log(`Misión completada: ${mission.description}`);
                    //se inscremente el indice de la misión
                    currentMissionIndex++;
                    completeNextMission(); // Pasar a la siguiente misión
                } else {
                    //Si la misión no se completa con éxito, se rechaza la promesa con un error
                    reject(new Error(`${character.name} falló en la misión ${mission.description}.`));
                }
            } else {
                resolve(); // Todas las misiones completadas
            };
        };

        completeNextMission();
    });
};

// Alternativa de manejo de misiones con callback en caso de fallo
function acceptMissionsWithCallback(character: Character, missions: Mission[], callback: (error: Error | null) => void) {
    let currentMissionIndex = 0;

    function completeNextMission() {
        if (currentMissionIndex < missions.length) {
            const mission = missions[currentMissionIndex];
            if (completeMission(character, mission)) {
                console.log(`Misión completada: ${mission.description}`);
                currentMissionIndex++;
                completeNextMission(); // Pasar a la siguiente misión
            } else {
                callback(new Error(`${character.name} falló en la misión ${mission.description}.`));
            }
        } else {
            callback(null); // Todas las misiones completadas sin error
        };
    };

    completeNextMission();
};

export {
    createCharacter,
    listCharacters,
    updateCharacter,
    deleteCharacter,
    assignMission,
    completeMission,
    listMissions,
    triggerEvent,
    acceptMissions,
    acceptMissionsWithCallback
};