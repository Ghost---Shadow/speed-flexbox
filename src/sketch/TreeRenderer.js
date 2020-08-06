import Tree from './Tree';

import { DIRECTION_ROW } from './constants';

const TreeRenderer = (p) => {
  const root = new Tree({ x: 0, y: 0 }, { x: p.width, y: p.height }, DIRECTION_ROW, null, 2);
  const active = root;

  const mouseDragged = () => {
    active.update(p);
  };

  const draw = () => {
    p.fill(255, 255, 0, 20);
    p.stroke(0);
    root.draw(p);
  };

  return { draw, mouseDragged };
};

export default TreeRenderer;
