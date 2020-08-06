const QuadTreeRenderer = (p) => {
  let startX = p.width / 2;

  const mouseDragged = () => {
    startX = p.mouseX;
  };

  const draw = () => {
    p.fill(255, 255, 0, 20);
    p.stroke(0);
    p.rect(0, 0, startX, p.height);
    p.rect(startX, 0, p.width, p.height);
  };

  return { draw, mouseDragged };
};

export default QuadTreeRenderer;
