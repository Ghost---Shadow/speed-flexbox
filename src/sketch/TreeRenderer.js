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
    if (!active) return;
    active.update(p);
  };

  const draw = () => {
    if (!root) return;
    root.draw(p, active);
  };

  const toggleDirection = () => {
    if (!root) return;
    if (!active) return;
    const newDirection = active.direction === DIRECTION_COLUMN ? DIRECTION_ROW : DIRECTION_COLUMN;
    active.setDirection(newDirection);
  };

  const incrementSegments = () => {
    if (!root) return;
    if (!active) return;
    active.setSegments(active.segments + 1);
  };

  const decrementSegments = () => {
    if (!root) return;
    if (!active) return;
    active.setSegments(active.segments - 1);
  };

  const selectActive = () => {
    if (!root) return;
    active = root.findActive(p.mouseX, p.mouseY);
  };

  const selectActivesParent = () => {
    if (!active) return;
    if (active.parent) {
      active = active.parent;
    }
  };

  const pickSegment = () => {
    if (!active) return;
    active.pickSegment(p);
  };

  return {
    initialize,
    draw,
    mouseDragged,
    toggleDirection,
    incrementSegments,
    decrementSegments,
    selectActive,
    selectActivesParent,
    pickSegment,
  };
};

export default TreeRenderer;
