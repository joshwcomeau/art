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

    }
  }
}


function scaleCanvas(canvas, ctx) {
  // This ensures canvas looks crisp on retina displays, where there are
  // in fact 4 on-screen pixels for every 1 calculated pixel.
  const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;

  const ratio = (window.devicePixelRatio || 1) / backingStoreRatio;

  if (ratio > 1) {
    /* eslint-disable no-param-reassign */
    canvas.style.height = canvas.height + 'px';
    canvas.style.width = canvas.width + 'px';
    canvas.width *= ratio;
    canvas.height *= ratio;
    /* eslint-enable */

    ctx.scale(ratio, ratio);
  }
}
