import TreeRenderer from './TreeRenderer';

/* eslint-disable no-param-reassign */
const sketch = (p) => {
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  let img = null;

  p.setup = () => {
    // create canvas
    const c = p.createCanvas(canvasWidth, canvasHeight);
    TreeRenderer.initialize(p);
    c.drop(p.gotFile);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    canvasWidth = props.width;
    canvasHeight = props.height;
    p.resizeCanvas(props.width, props.height);
    TreeRenderer.initialize(p);
  };

  p.draw = () => {
    if (!img) {
      p.background(255);
      p.fill(30);
      p.noStroke();
      p.textSize(24);
      p.textAlign(p.CENTER);
      p.text('Drag an image file onto the canvas.', p.width / 2, p.height / 2);
      p.text('Reload the page if the image disappears.', p.width / 2, p.height / 2 + 50);
    } else {
      p.image(img, 0, 0, p.width, p.height);
    }

    TreeRenderer.draw();
  };

  p.mouseDragged = () => {
    TreeRenderer.mouseDragged();
  };

  p.mousePressed = () => {
    TreeRenderer.pickSegment();
  };

  p.keyReleased = () => {
    const noop = () => null;
    const functionToInvoke = {
      87: TreeRenderer.selectActivesParent, // W: Go up one parent
      83: TreeRenderer.selectActive, // S: Select child on cursor
      68: TreeRenderer.incrementSegments, // D: Increase subdivision
      65: TreeRenderer.decrementSegments, // A: Decrease subdivision
      82: TreeRenderer.toggleDirection, // R: Switch direction
    }[p.keyCode] || noop;
    functionToInvoke();
  };

  p.gotFile = (file) => {
    // If it's an image file
    if (file.type === 'image') {
      // Create an image DOM element but don't show it
      img = p.createImg(file.data).hide();
      const aspect = img.width / img.height;
      const newHeight = p.width / aspect;
      p.resizeCanvas(p.width, newHeight);
      TreeRenderer.initialize(p);
      // Draw the image onto the canvas
      // p.image(img, 0, 0, p.width, p.height);
    } else {
      console.log('Not an image file!');
    }
  };
};
/* eslint-enable no-param-reassign */

export default sketch;
