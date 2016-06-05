import seedRandom from 'seed-random';

export const createNewSeed = () => String(Math.ceil(Math.random() * 1000000));

export function createRandomNumberGenerator(seed) {
  const seedFunction = seedRandom(seed);

  return function random (min = 0, max = 1, round = true) {
    const num = seedFunction() * (max - min) + min;

    return round ? Math.round(num) : num;
  };
}

export function shuffle(arr, randomFunc = Math.random) {
  var rand;
  var tmp;
  var len = arr.length;
  var ret = arr.slice();

  while (len) {
    rand = Math.floor(randomFunc(1) * len--);
    tmp = ret[len];
    ret[len] = ret[rand];
    ret[rand] = tmp;
  }

  return ret;
}
