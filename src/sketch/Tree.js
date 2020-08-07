import { interp1D } from './utils';
import { DIRECTION_ROW, DIRECTION_COLUMN } from './constants';

class Tree {
  static id = 0;
  constructor(start, end, direction, parent, segments) {
    this.start = start;
    this.end = end;
    this.direction = direction;
    this.parent = parent;
    this.children = [];
    this.id = Tree.id += 1;

    this.createSegments(segments);
  }

  createSegments(segments) {
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

  recalculateSegments() {
    const {
      start, end, direction, segments,
    } = this;
    const t = 1 / segments;
    for (let i = 0; i < segments; i += 1) {
      const cStart = interp1D(start, end, i * t, direction, true);
      const cEnd = interp1D(start, end, (i + 1) * t, direction, false);
      this.children[i].cStart = cStart;
      this.children[i].cEnd = cEnd;
    }
  }

  update(p) {
    if (this.children.length < 2) return;

    const axis = { [DIRECTION_ROW]: 'x', [DIRECTION_COLUMN]: 'y' }[this.direction];
    const mouse = { [DIRECTION_ROW]: p.mouseX, [DIRECTION_COLUMN]: p.mouseY }[this.direction];

    this.children[0].end[axis] = mouse;
    this.children[1].start[axis] = mouse;
  }

  setDirection(newDirection) {
    this.direction = newDirection;
    this.recalculateSegments();
  }

  draw(p) {
    const width = this.end.x - this.start.x;
    const height = this.end.y - this.start.y;
    p.rect(this.start.x, this.start.y, width, height);
    this.children.forEach((child) => child.draw(p));
  }
}

export default Tree;
