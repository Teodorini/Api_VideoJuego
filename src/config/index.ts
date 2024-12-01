

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
        console.log("\nMenú de Opciones:");
        console.log("1. Crear Personaje");
        console.log("2. Listar Personajes");
        console.log("3. Actualizar Nivel de un Personaje");
        console.log("4. Eliminar Personaje");
        console.log("5. Crear y Asignar Misión");
        console.log("6. Listar Misiones");
        console.log("7. Completar Misión");
        console.log("8. Generar Evento Aleatorio");
        console.log("9. Gestionar Inventario de un Personaje");
        console.log("10. Salir");

        const option = readlineSync.question("Selecciona una opción: ").trim();

        switch (option) {
          
            case '1': {
                const name = readlineSync.question("Nombre del personaje: ").trim();
                const level = parseInt(readlineSync.question("Nivel inicial: "), 10);
                const health = parseInt(readlineSync.question("Salud inicial: "), 10);
            
                if (isNaN(level) || isNaN(health)) {
                    console.error("Error: Nivel y salud deben ser valores numéricos válidos.");
                    break;
                };
                
                //para almacenar la opción seleccionada por el usuario
                // se inicializa -1 para garantizar que el bucle se ejecute al menos una vez.
                let type: number = -1;

                // Array con lo tipos de personajes disponibles
                const options: ('warrior' | 'mage' | 'character')[] = ['warrior', 'mage', 'character'];
            
                while (type === -1) {
                    console.log('Seleccione el tipo de personaje:');
                    options.forEach((option, index) => {
                        console.log(`${index + 1}. ${option}`);
                    });
                    console.log('0. Cancelar');
            
                    // Solicita al usuario la selección
                    type = parseInt(readlineSync.question('Ingrese el número de la opción: '), 10);
            
                    if (type === 0) {
                        console.log('Operación cancelada por el usuario.');
                        //para reestablecer la opción y salir del bucle
                        type = -1; 
                        break;
                    };
            
                    if (isNaN(type) || type < 1 || type > options.length) {
                        console.log('Opción inválida. Por favor, intente de nuevo.');
                        // Restablece la opción para repetir el bucle
                        type = -1; 
                    };
                };
            
                // Asigna el tipo de personaje si la selección es válida
                if (type !== -1) {
                    const selectedType: 'warrior' | 'mage' | 'character' = options[type - 1]; // Asegura el tipo literal correcto
            
                    // Llama a la función createCharacter y confirma la creación.
                    createCharacter(name, level, health, selectedType);
                    console.log(`El personaje "${name}" ha sido creado y guardado en el archivo JSON.`);
                };
                break;
            };
            case '2':
                //Muestra una lista de todos los personajes usando listCharacters
                console.log(listCharacters());
                break;
            case '3':
                const updateName = readlineSync.question("Nombre del personaje a actualizar: ").trim();
                const newLevel = parseInt(readlineSync.question("Nuevo nivel: "), 10);
                const newHealth = parseInt(readlineSync.question("Nueva salud: "), 10);
                //Actualiza el nivel y la salud de un personaje existente utilizando updateCharacter
                console.log(updateCharacter(updateName, newLevel, newHealth));
                break;
            case '4':
                const deleteName = readlineSync.question("Nombre del personaje a eliminar: ").trim();
                //Elimina un personaje por nombre utilizando deleteCharacter
                console.log(deleteCharacter(deleteName));
                break;
            case '5':
                const charName = readlineSync.question("Nombre del personaje: ").trim();
                const missionName = readlineSync.question("Nombre de la misión: ").trim();
                const description = readlineSync.question("Descripción de la misión: ").trim();
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
                const missionCharName = readlineSync.question("Nombre del personaje que completará la misión: ").trim();
                const missionToCompleteName = readlineSync.question("Nombre de la misión a completar: ").trim();
                //Busca un personaje y una misión específica para intentar completarla
                const character = characters.find(char => char.name.toLowerCase() === missionCharName.toLowerCase());
                if (character) {
                    const mission = character.missions.find(m => m.name === missionToCompleteName);
                    if (mission) {
                        console.log(completeMission(character, mission));
                    } else {
                        console.log("Misión no encontrada.");
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
                    console.log(`\n--- Gestión de Inventario para ${inventoryCharacter.name} ---`);
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
                            console.log("Opción no válida. Por favor, intenta nuevamente.");
                            break;
                    };
                };
                break;

            case '10':
                console.log("Saliendo del sistema. ¡Adiós!");
                exit = true;
                break;
            default:
                console.log("Opción no válida.");
        };
    };

    saveCharactersToFile();
};


mainMenu();
