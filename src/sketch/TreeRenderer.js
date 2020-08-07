import Tree from './Tree';

import { DIRECTION_ROW, DIRECTION_COLUMN } from './constants';

const TreeRenderer = (p) => {
  let root = null;
  let active = null;

  const initialize = () => {
    root = new Tree({ x: 0, y: 0 }, { x: p.width, y: p.height }, DIRECTION_ROW, null, 2);
    active = root;
  };

  const mouseDragged = () => {
    if (root === null) return;
    active.update(p);
  };

  const draw = () => {
    if (root === null) return;
    p.fill(255, 255, 0, 20);
    p.stroke(0);
    root.draw(p);
  };

  const toggleDirection = () => {
    if (root === null) return;
    const newDirection = active.direction === DIRECTION_COLUMN ? DIRECTION_ROW : DIRECTION_COLUMN;
    active.setDirection(newDirection);
  };

  const incrementSegments = () => {
    if (root === null) return;
    active.setSegments(active.segments + 1);
  };

  const decrementSegments = () => {
    if (root === null) return;
    active.setSegments(active.segments - 1);
  };

  return {
    initialize,
    draw,
    mouseDragged,
    toggleDirection,
    incrementSegments,
    decrementSegments,
  };
};

export default TreeRenderer;
