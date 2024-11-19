


const readlineSync = require('readline-sync');
import { createCharacter, listCharacters, updateCharacter, deleteCharacter, assignMission, completeMission, listMissions, triggerEvent } from '../controllers/gameLogic';
import { Mission, MissionType } from '../models/Mission';
import { Character } from "../models/Character";


// Array para almacenar personajes
const characters: Character[] = [];

async function main() {
    console.log("Bienvenido al Sistema de Juego.");
    let exit = false;

    while (!exit) {
        console.log("\nMenú de Opciones:");
        console.log("1. Crear Personaje");
        console.log("2. Listar Personajes");
        console.log("3. Actualizar Nivel de un Personaje");
        console.log("4. Eliminar Personaje");
        console.log("5. Crear y Asignar Mision");
        console.log("6. Listar Misiones");
        console.log("7. Completar Mision");
        console.log("8. Generar Evento Aleatorio");
        console.log("9. Agregar Objetos al Inventario de un Personaje");
        console.log("10. Salir");

        const option = readlineSync.question("Selecciona una opcion: ");

        try {
            switch (option) {
                case '1': 
                    const name = readlineSync.question("Nombre del personaje: ");
                    const level = parseInt(readlineSync.question("Nivel inicial: "), 10);
                    const health = parseInt(readlineSync.question("Salud inicial: "), 10);
                    const newCharacter = new Character(name, level, health);
                    characters.push(newCharacter);
                    console.log(`Personaje "${name}" creado.`);
                    break;

                case '2': 
                    if (characters.length === 0) {
                        console.log("No hay personajes creados.");
                        break;
                    }
                    console.log("Personajes existentes:");
                    characters.forEach((character, index) => {
                        console.log(`${index + 1}. ${character.name} (Nivel: ${character.level}, Salud: ${character.health}, Experiencia: ${character.experience})`);
                    });
                    break;

                case '3':
                    const charName = readlineSync.question("Nombre del personaje a actualizar: ");
                    const newLevel = parseInt(readlineSync.question("Nuevo nivel: "), 10);

                    if (isNaN(newLevel)) {
                        console.log("Por favor, introduce un valor válido para el nivel.");
                        break;
                    }

                    updateCharacter(charName, newLevel);
                    break;

                case '4':
                    const deleteName = readlineSync.question("Nombre del personaje a eliminar: ");
                    if (deleteCharacter(deleteName)) {
                        console.log("Personaje eliminado exitosamente.");
                    } else {
                        console.log("El personaje no existe.");
                    }
                    break;

                case '5':
                    const missionName = readlineSync.question("Nombre de la misión: ");
                    const description = readlineSync.question("Descripción de la misión: ");
                    const difficulty = parseInt(readlineSync.question("Dificultad (entre 1-10): "), 10);
                    const reward = parseInt(readlineSync.question("Recompensa: "), 10);
                    const type = readlineSync.question("Tipo (Main/Side/Event): ") as MissionType;

                    const mission = new Mission(missionName, description, difficulty, reward, type);
                    const assignName = readlineSync.question("Nombre del personaje al que se asignará la misión: ");
                    const character = listCharacters().find(char => char.name === assignName);

                    if (character) {
                        assignMission(character, mission);
                    } else {
                        console.log("El personaje no existe.");
                    }
                    break;

                case '6':
                    console.log("\nMisiones:");
                    console.table(listMissions());
                    break;

                case '7':
                    const completeChar = readlineSync.question("Nombre del personaje que completará la misión: ");
                    const missionCompleteName = readlineSync.question("Nombre de la misión a completar: ");
                    const completeMissionInstance = listMissions().find(m => m.name === missionCompleteName);
                    const characterComplete = listCharacters().find(char => char.name === completeChar);

                    if (characterComplete && completeMissionInstance) {
                        completeMission(characterComplete, completeMissionInstance);
                        console.log(`Misión completada por ${characterComplete.name}.`);
                    } else {
                        console.log("Personaje o misión no encontrados.");
                    }
                    break;

                case '8':
                    const eventChar = readlineSync.question("Nombre del personaje para el evento: ");
                    const eventCharacter = listCharacters().find(char => char.name === eventChar);

                    if (eventCharacter) {
                        await triggerEvent(eventCharacter);
                        console.log(`Evento aleatorio generado para ${eventCharacter.name}.`);
                    } else {
                        console.log("Personaje no encontrado.");
                    }
                    break;

                case '9':
                    if (characters.length === 0) {
                        console.log("No hay personajes creados.");
                        break;
                    }

                    console.log("Selecciona un personaje:");
                    characters.forEach((character, index) => {
                        console.log(`${index + 1}. ${character.name}`);
                    });

                    const characterIndex = parseInt(readlineSync.question("Número del personaje: "), 10) - 1;
                    if (characterIndex >= 0 && characterIndex < characters.length) {
                        const selectedCharacter = characters[characterIndex];
                        const itemName = readlineSync.question("Nombre del objeto a agregar: ");
                        selectedCharacter.addItem(itemName); // Uso del método de la clase
                    } else {
                        console.log("Selección inválida.");
                    }
                    break;

                case '10': 
                    console.log("Saliendo del sistema. ¡Adiós!");
                    exit = true;
                    break;

                default:
                    console.log("Opción no válida.");
                    break;
            }
        } catch (error: any) {
            console.error("Error:", error.message);
        }
    };
};

main();
