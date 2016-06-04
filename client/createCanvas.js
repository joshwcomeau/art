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
      shapes.forEach(shape => {
        console.log("Shape", shape)
        context.beginPath();
        drawShape(shape);
        context.fillStyle = shape.fill;
        context.fill();
      });


    }
  }
}


function drawShape(context, { center: [x, y], points, radius, angle = 0 }) {
  //points: number of points (or number of sides for polygons)
  //angle: initial angle (clockwise), by default, stars and polygons are 'pointing' up
  for (let i = 0; i <= points; i++) {
    const a = i * 2 * Math.PI / points - Math.PI / 2 + angle;
    context.lineTo(x + radius * Math.cos(a), y + radius * Math.sin(a));
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
