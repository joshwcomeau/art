export default function createCanvas(el) {
  const canvas = el;
  const context = canvas.getContext('2d');

  // TODO: Resize handler that redraws. short throttle?


  return {
    draw(settings, shapes) {
      // TODO: Undraw?

      // Calculate and apply our backing scale.
      scaleCanvas(canvas, context);

      // Set the background color
      canvas.style.backgroundColor = settings.backgroundColor;

      drawShape = drawShape.bind(null, context);

      // Draw our shapes.
      // TODO: Support more than just polygons
      context.beginPath();

      shapes.forEach(drawShape);

      context.strokeStyle = "#bada55";
      context.fillStyle = "#bada55";
      context.lineWidth = 2;
      context.stroke();

    }
  }
}


function drawShape(context, { center: [x, y], points, radius, alpha0 = 0 }) {
  console.log("Call with", arguments)
  //points: number of points (or number of sides for polygons)
  //angle0: initial angle (clockwise), by default, stars and polygons are 'pointing' up
  for (let i = 0; i <= points; i++) {
    const angle = i * 2 * Math.PI / points - Math.PI / 2 + alpha0;
    context.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
  }
}


function scaleCanvas(canvas, context) {
  // This ensures canvas looks crisp on retina displays, where there are
  // in fact 4 on-screen pixels for every 1 calculated pixel.
  const backingStoreRatio = context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1;

  const ratio = (window.devicePixelRatio || 1) / backingStoreRatio;

  if (ratio > 1) {
    /* eslint-disable no-param-reassign */
    canvas.style.height = canvas.height + 'px';
    canvas.style.width = canvas.width + 'px';
    canvas.width *= ratio;
    canvas.height *= ratio;
    /* eslint-enable */

    context.scale(ratio, ratio);
  }
}
