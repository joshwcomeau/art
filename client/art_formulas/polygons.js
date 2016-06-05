// Define the algorithm that generates this piece of art.
// Strategy: Create an array of items to draw, with a unified interface.
/*
[
  { shape: 'circle', radius: 10, center: [100, 200], fill: '#AAA' },
  { shape: 'polygon', radius: 12, points: 3, center: [0, 50], fill: '#444' },
]
*/
import sample from 'lodash/sample';

import {
  createRandomNumberGenerator,
  createNewSeed,
  shuffle,
} from 'utils';
import palettes from 'palettes';


export default function generate(seed = createNewSeed()) {
  const random = createRandomNumberGenerator(seed);

  const selectedPalette = palettes[random(0, palettes.length - 1)];
  console.log("Palette", selectedPalette, palettes)
  const [backgroundColor, ...palette] = shuffle(selectedPalette, random);


  const settings = {
    numOfPolygons: random(2, 25),
    backgroundColor,
    palette,
  };

  const acceptableAngles = [
    null,
    0,
    0,
    Math.PI,
    Math.PI * 0.5,
    2
  ];


  const shapes = [];

  for (let i = 0; i < settings.numOfPolygons; i++) {
    const color = sample(settings.palette);

    shapes.push({
      shape: 'polygon',
      fill: color,
      radius: random(10, 100),
      points: random(3, 8, false),
      center: [random(0, 800), random(0, 600)],
      angle: acceptableAngles[random(0, 5)],
    });
  }

  return { settings, shapes };
}
