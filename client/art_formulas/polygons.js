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
} from 'utils';


export default function generate(seed = createNewSeed()) {
  const settings = {
    numOfPolygons: 4,
    backgroundColor: '#69D2E7',
    palette: [
      '#A7DBD8',
      '#E0E4CC',
      '#F38630',
      '#FA6900',
    ],
  };

  const random = createRandomNumberGenerator(seed);

  const shapes = [];

  for (let i = 0; i < settings.numOfPolygons; i++) {
    const color = sample(settings.palette);

    shapes.push({
      shape: 'polygon',
      fill: color,
      radius: random(10, 100),
      points: random(3, 8),
      center: [random(0, 500), random(0, 400)],
    });
  }

  return { settings, shapes };
}
