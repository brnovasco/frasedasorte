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
  phrase,
  n,
  rangeMin,
  rangeMax,
}: {
  phrase: string;
  n: number;
  rangeMin: number;
  rangeMax: number;
}): number[] {
  if (rangeMax - rangeMin + 1 < n) {
    throw new Error("Range is too small for the number of unique numbers requested.");
  }

  const seed = hashString(phrase);
  const random = pseudoRandom(seed);
  const numbersSet = new Set<number>();

  while (numbersSet.size < n) {
    const number = Math.floor(random() * (rangeMax - rangeMin + 1)) + rangeMin;
    numbersSet.add(number);
  }

  return Array.from(numbersSet).sort((a, b) => a - b);
}

// wrapper for generateNumbers based on the GAMES constant
export function generateNumbersByGameName({
  phrase,
  gameName,
  moreNumbers,
}: {
  phrase: string;
  gameName: string;
  moreNumbers: number;
}): number[] {
  const game = GAMES.find((game) => game.name === gameName);
  if (!game) {
    throw new Error(`Game not found: ${gameName}`);
  }
  return generateNumbers({
    phrase: phrase,
    n: game.listDefaultSize + moreNumbers,
    rangeMin: game.rangeMin,
    rangeMax: game.rangeMax,
  });
}
