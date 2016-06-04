import createCanvas from 'createCanvas';
import generate from 'art_formulas/polygons';


document.addEventListener( 'DOMContentLoaded', function () {
  const canvasEl = document.querySelector('#artwork');
  const canvas = createCanvas(canvasEl);

  const { settings, shapes } = generate();

  canvas.draw(settings, shapes);
});

if (module.hot) {
  module.hot.accept();
}
