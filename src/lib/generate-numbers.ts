import { GAMES } from "./constants";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function pseudoRandom(seed: number): () => number {
  return () => {
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
  };
}

export function generateNumbers({
  frase,
  n,
  rangeMin,
  rangeMax,
}: {
  frase: string;
  n: number;
  rangeMin: number;
  rangeMax: number;
}): number[] {
  const seed = hashString(frase);
  const random = pseudoRandom(seed);
  const numbers = Array.from({ length: n }, () => {
    const number = Math.floor(random() * (rangeMax - rangeMin + 1)) + rangeMin;
    return number;
  });
  return numbers;
}

// wrapper for generateNumbers based on the GAMES constant
export function generateNumbersByGameName({
  frase,
  gameName,
  additionalNumbers,
}: {
  frase: string;
  gameName: string;
  additionalNumbers: number;
}): number[] {
  const game = GAMES.find((game) => game.name === gameName);
  if (!game) {
    throw new Error(`Game not found: ${gameName}`);
  }
  return generateNumbers({
    frase: frase,
    n: game.listDefaultSize + additionalNumbers,
    rangeMin: game.rangeMin,
    rangeMax: game.rangeMax,
  });
}
