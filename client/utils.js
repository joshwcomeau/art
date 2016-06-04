import seedRandom from 'seed-random';

export const createNewSeed = () => String(Math.ceil(Math.random() * 1000000));

export function createRandomNumberGenerator(seed) {
  const seedFunction = seedRandom(seed);

  return function random (min = 1, max) {
    if (typeof max === 'undefined') {
      max = min;
      min = 0;
    }

    return seedFunction() * (max - min) + min;
  };
}
