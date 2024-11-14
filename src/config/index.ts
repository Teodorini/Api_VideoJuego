import { createCharacter, listCharacters, updateCharacter, deleteCharacter, assignMission, completeMission, listMissions, triggerEvent, acceptMissions, acceptMissionsWithCallback } from '../controllers/gameLogic';
import { Mission, MissionType } from '../models/Mission';

// Crear personajes
const warrior = createCharacter('Lyrius', 7, 100, 'warrior');
const mage = createCharacter('Merlin', 5, 100, 'mage');

// Listar personajes
console.log("\nPersonajes creados:\n");
console.log(listCharacters());
//---------------------------------------------------------------
// Agregar objetos al inventario
warrior.addItem('Espada de Hierro');
warrior.addItem('Escudo de Plata');
mage.addItem('Bastón Mágico');
mage.addItem('Poción de Mana');


// Equipar ítems al Warrior
warrior.addItem('Espada de Hierro');
warrior.addItem('Escudo de Plata');


//........................................................


// Actualizar personaje
console.log("\nActualizando nivel de Lyrius...\n");
updateCharacter('Lyrius', 10);
console.log("\nActualizando nivel de Merlin...\n");
updateCharacter('Merlin', 8);
console.log("\nPersonajes después de la actualización:\n");
console.log(listCharacters());

// Crear misiones
const mission1 = new Mission('Rescatar al prisionero', 2, 110, MissionType.Main);
const mission2 = new Mission('Recolectar hierbas mágicas', 1, 50, MissionType.Side);
const mission3 = new Mission('Explorar la cueva de dragones', 5, 100, MissionType.Side);
const mission4 = new Mission('Defender el castillo', 4, 150, MissionType.Main);

// Asignar misiones a los personajes
console.log("\nAsignando misiones a los personajes:\n");
assignMission(warrior, mission1);
assignMission(mage, mission2);

// Listar misiones asignadas
console.log("\nMisiones asignadas:\n");
console.log(listMissions());

// Completar misiones
console.log("\nIntentando completar misiones:\n");
completeMission(warrior, mission1);  // Debería ser exitoso si el nivel del guerrero es suficiente
completeMission(mage, mission2);     // Debería ser exitoso si el nivel del mago es suficiente
completeMission(mage,mission4)

// Ejecutar un evento aleatorio para cada personaje
console.log("\nSimulando eventos aleatorios para los personajes:\n");
triggerEvent(warrior);
triggerEvent(mage);

// Aceptar múltiples misiones con Promesas
console.log("\nProbando aceptación de múltiples misiones con Promesas:\n");
const missions = [mission1, mission2, mission3, mission4];
acceptMissions(warrior, missions)
    .then(() => console.log("Todas las misiones completadas con éxito."))
    .catch(error => console.error(error.message));

// Aceptar múltiples misiones con callbacks
console.log("\nProbando aceptación de múltiples misiones con callback:\n");

acceptMissionsWithCallback(mage, missions, (error) => {
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Todas las misiones completadas con éxito (callback).");
    }
});

// Eliminar un personaje
console.log("\nEliminando Personaje...");
deleteCharacter('Xylus');
console.log("\nPersonajes después de la eliminación:\n");
console.log(listCharacters());