// Step 1: Create a function to convert a string into a number
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

// Step 2: Create a function to generate a pseudo-random number based on a seed
function pseudoRandom(seed: number): () => number {
  return () => {
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
  };
}

// Step 3: Create the main function
export function generateNumbers({
  frase,
  n,
  range,
}: {
  frase: string;
  n: number;
  range: number;
}): number[] {
  const seed = hashString(frase);
  const random = pseudoRandom(seed);
  const numbers = Array.from({ length: n }, () => Math.floor(random() * range));
  return numbers;
}
