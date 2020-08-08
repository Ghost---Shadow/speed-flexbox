import {
  interp1D, isPointInAabb, vec2, findDistance1D, argmMin, clamp,
} from './utils';
import { DIRECTION_ROW, DIRECTION_COLUMN } from './constants';

class Tree {
  // Counter for generated tree nodes
  static id = 0;

  // Min distance between segments/AKA min size of child
  static PADDING = 10;

  constructor(start, end, direction, parent, segments) {
    this.start = start;
    this.end = end;
    this.direction = direction;
    this.parent = parent;
    this.children = [];
    this.id = Tree.id;
    Tree.id += 1;

    this.createSegments(segments);
  }

  createSegments(segments) {
    this.children = [];

    this.segments = segments;
    const { start, end, direction } = this;

    if (segments > 1) {
      const t = 1 / segments;
      for (let i = 0; i < segments; i += 1) {
        const cStart = interp1D(start, end, i * t, direction, true);
        const cEnd = interp1D(start, end, (i + 1) * t, direction, false);
        const child = new Tree(cStart, cEnd, DIRECTION_ROW, this, 1);
        this.children.push(child);
      }
    }
  }

  pickSegment(p) {
    if (this.children.length < 2) return;

    const axis = { [DIRECTION_ROW]: 'x', [DIRECTION_COLUMN]: 'y' }[this.direction];
    const mouse = vec2(p.mouseX, p.mouseY);
    const distances = this.children
      .map((child) => findDistance1D(mouse, child.start, axis))
      .slice(1);
    const closestChildStart = argmMin(distances);

    this.leftChildIndex = closestChildStart;
    this.rightChildIndex = closestChildStart + 1;
  }

  update(p) {
    this.moveActiveSegment(p);
  }

  moveActiveSegment(p) {
    if (this.children.length < 2) return;

    const axis = { [DIRECTION_ROW]: 'x', [DIRECTION_COLUMN]: 'y' }[this.direction];
    const mouse = { [DIRECTION_ROW]: p.mouseX, [DIRECTION_COLUMN]: p.mouseY }[this.direction];

    const { leftChildIndex, rightChildIndex } = this;

    const lowerBound = this.children[leftChildIndex].start[axis];
    const upperBound = this.children[rightChildIndex].end[axis];

    const clampedMouse = clamp(mouse, lowerBound + Tree.PADDING, upperBound - Tree.PADDING);

    this.children[leftChildIndex].end[axis] = clampedMouse;
    this.children[rightChildIndex].start[axis] = clampedMouse;
  }

  setDirection(newDirection) {
    this.direction = newDirection;
    this.createSegments(this.segments);
  }

  setSegments(newSegments) {
    if (newSegments < 1) return;
    this.createSegments(newSegments);
  }

  draw(p, active) {
    const width = this.end.x - this.start.x;
    const height = this.end.y - this.start.y;
    if (active.id === this.id) {
      p.fill(255, 255, 0, 20);
      p.stroke(255, 0, 0);
    } else {
      p.fill(255, 255, 255, 20);
      p.stroke(0);
    }
    p.rect(this.start.x, this.start.y, width, height);
    this.children.forEach((child) => child.draw(p, active));
  }

  shouldBeActive(x, y) {
    if (this.children.length) return false;
    return isPointInAabb(vec2(x, y), this.start, this.end);
  }

  findActive(x, y) {
    if (this.shouldBeActive(x, y)) {
      return this;
    }
    const candidates = this.children
      .map((child) => child.findActive(x, y))
      .filter((p) => p);

    return candidates[0];
  }
}

export default Tree;
