/* eslint-disable no-param-reassign */
const sketch = (p) => {
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  let startX = p.width / 2;
  let img = null;

  p.setup = () => {
    // create canvas
    const c = p.createCanvas(canvasWidth, canvasHeight);
    c.drop(p.gotFile);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    canvasWidth = props.width;
    canvasHeight = props.height;
  };

  p.draw = () => {
    if (!img) {
      p.background(30);
      p.fill(255);
      p.noStroke();
      p.textSize(24);
      p.textAlign(p.CENTER);
      p.text('Drag an image file onto the canvas.', p.width / 2, p.height / 2);
      p.text('Reload the page if the image disappears.', p.width / 2, p.height / 2 + 50);
    } else {
      p.image(img, 0, 0, p.width, p.height);
    }

    p.fill(255, 255, 0, 20);
    p.stroke(0);
    p.rect(0, 0, startX, p.height);
    p.rect(startX, 0, p.width, p.height);
  };

  p.mouseDragged = () => {
    startX = p.mouseX;
  };

  p.gotFile = (file) => {
    // If it's an image file
    if (file.type === 'image') {
      // Create an image DOM element but don't show it
      img = p.createImg(file.data).hide();
      const aspect = img.width / img.height;
      const newHeight = p.width / aspect;
      p.resizeCanvas(p.width, newHeight);
      // Draw the image onto the canvas
      // p.image(img, 0, 0, p.width, p.height);
    } else {
      console.log('Not an image file!');
    }
  };
};
/* eslint-enable no-param-reassign */

export default sketch;