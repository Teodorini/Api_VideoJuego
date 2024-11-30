const readlineSync = require('readline-sync');
import {
    characters, loadCharactersFromFile, saveCharactersToFile, createCharacter, listCharacters,
    updateCharacter, deleteCharacter, assignMission, listMissions, completeMission, triggerEvent, manageInventory,findCharacterByName
} from '../controllers/gameLogic';


async function mainMenu() {
    console.log("--- BIENVENIDO AL SISTEMA DE JUEGO ---");
    loadCharactersFromFile();

    let exit = false;

    while (!exit) {
        console.log("\n----------------------------");
        console.log("\nMenú de Opciones:");
        console.log("\n----------------------------");
        console.log("1. Crear Personaje");
        console.log("2. Listar Personajes");
        console.log("3. Actualizar Nivel de un Personaje");
        console.log("4. Eliminar Personaje");
        console.log("5. Crear y Asignar Mision");
        console.log("6. Listar Misiones");
        console.log("7. Completar Mision");
        console.log("8. Generar Evento Aleatorio");
        console.log("9. Gestionar Inventario de un Personaje");
        console.log("10. Salir");

        const option = readlineSync.question("Selecciona una opcion: ").trim();

        switch (option) {
            case '1':
                const name = readlineSync.question("Nombre del personaje: ").trim();
                const level = parseInt(readlineSync.question("Nivel inicial: "), 10);
                const health = parseInt(readlineSync.question("Salud inicial: "), 10);
                //Llama a createCharacter, que agrega el personaje al arreglo y guarda los cambios
                console.log(createCharacter(name, level, health));
                break;
            case '2':
                //Muestra una lista de todos los personajes usando listCharacters
                console.log(listCharacters());
                break;
            case '3':
                const updateName = readlineSync.question("Nombre del personaje a actualizar: ").trim();
                const newLevel = parseInt(readlineSync.question("Nuevo nivel: "), 10);
                const newHealth = parseInt(readlineSync.question("Nueva salud: "), 10);
                //Actualiza el nivel y la salud de un personaje existente utilizando updateCharacter
                (updateCharacter(updateName, newLevel, newHealth));
                break;
            case '4':
                const deleteName = readlineSync.question("Nombre del personaje a eliminar: ").trim();
                //Elimina un personaje por nombre utilizando deleteCharacter
                console.log(deleteCharacter(deleteName));
                break;
            case '5':
                const charName = readlineSync.question("Nombre del personaje: ").trim();
                const missionName = readlineSync.question("Nombre de la mision: ").trim();
                const description = readlineSync.question("Descripcion de la mision: ").trim();
                const difficulty = parseInt(readlineSync.question("Dificultad (1-10): "), 10);
                const reward = parseInt(readlineSync.question("Recompensa: "), 10);
                const type = readlineSync.question("Tipo (Main/Side/Event): ").trim() as any;

                //Asigna una nueva misión a un personaje existente, pasando detalles como nombre, dificultad y recompensa
                //usa la función assignMission()
                console.log(assignMission(charName, missionName, description, difficulty, reward, type));
                break;
            case '6':
                console.log("Lista de Misiones:");
                //Muestra todas las misiones asignadas usando listMissions
                console.log(listMissions());
                break;
            case '7':
                const missionCharName = readlineSync.question("Nombre del personaje que completara la mision: ").trim();
                const missionToCompleteName = readlineSync.question("Nombre de la mision a completar: ").trim();
                //Busca un personaje y una misión específica para intentar completarla
                const character = characters.find(char => char.name.toLowerCase() === missionCharName.toLowerCase());
                if (character) {
                    const mission = character.missions.find(m => m.name === missionToCompleteName);
                    if (mission) {
                        console.log(completeMission(character, mission));
                    } else {
                        console.log("Mision no encontrada.");
                    }
                } else {
                    console.log("Personaje no encontrado.");
                };
                break;
            case '8':
                const eventCharName = readlineSync.question("Nombre del personaje para generar el evento: ").trim();
                //Genera un evento aleatorio para un personaje usando triggerEvent
                const eventCharacter = characters.find(char => char.name.toLowerCase() === eventCharName.toLowerCase());
                if (eventCharacter) {
                    await triggerEvent(eventCharacter);
                } else {
                    console.log("Personaje no encontrado.");
                };
                break;
            case '9':
                const inventoryCharName = readlineSync.question("Nombre del personaje para gestionar el inventario: ").trim();
                const inventoryCharacter = findCharacterByName(inventoryCharName);

                if (!inventoryCharacter) {
                    console.log("El personaje no existe.");
                    break; 
                };

                let exitInventoryMenu = false;
                while (!exitInventoryMenu) {
                    console.log(`\n--- Gestion de Inventario para ${inventoryCharacter.name} ---`);
                    console.log("1. Agregar objeto");
                    console.log("2. Ver inventario");
                    console.log("3. Eliminar objeto");
                    console.log("4. Salir del inventario");

                    const inventoryOption = readlineSync.question("Selecciona una opcion: ");
                    //Permite agregar, listar o eliminar objetos del inventario del personaje seleccionado
                    switch (inventoryOption) {
                        case '1':
                            const itemNameToAdd = readlineSync.question("Nombre del objeto a agregar: ").trim();
                            console.log(manageInventory(inventoryCharacter.name, 'add', itemNameToAdd));
                            break;

                        case '2':
                            console.log(manageInventory(inventoryCharacter.name, 'list'));
                            break;

                        case '3':
                            const itemNameToRemove = readlineSync.question("Nombre del objeto a eliminar: ").trim();
                            console.log(manageInventory(inventoryCharacter.name, 'remove', itemNameToRemove));
                            break;

                        case '4':
                            console.log(`Saliendo del inventario de ${inventoryCharacter.name}.`);
                            exitInventoryMenu = true;
                            break;

                        default:
                            console.log("Opcion no valida. Por favor, intenta nuevamente.");
                            break;
                    };
                };
                break;

            case '10':
                console.log("Saliendo del sistema. ¡Adios!");
                exit = true;
                break;
            default:
                console.log("Opcion no valida.");
        };
    };

    saveCharactersToFile();
};


mainMenu();
