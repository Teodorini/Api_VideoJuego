
// Función para calcular la experiencia ganada por el personaje
export function calculateExperience(level: number): number {
    return level * 100;  // Cálculo sencillo basado en el nivel
  }
  
  // Función para determinar la probabilidad de éxito de una misión
  export function successProbability(characterLevel: number, missionDifficulty: number): boolean {
    const probability = (characterLevel / missionDifficulty) * 100;
    return Math.random() * 100 <= probability;  // Cambié esta función para usar un cálculo de probabilidad
  }