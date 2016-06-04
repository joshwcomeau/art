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
  const random = createRandomNumberGenerator(seed);

  const settings = {
    numOfPolygons: random(2, 25),
    backgroundColor: '#69D2E7',
    palette: [
      '#A7DBD8',
      '#E0E4CC',
      '#F38630',
      '#FA6900',
    ],
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
      points: Math.round(random(3, 8)),
      center: [random(0, 800), random(0, 600)],
      angle: acceptableAngles[Math.round(random(0, 5))],
    });
  }

  return { settings, shapes };
}
