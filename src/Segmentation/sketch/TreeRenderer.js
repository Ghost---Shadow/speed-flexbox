import Tree from './Tree';

import { DIRECTION_ROW, DIRECTION_COLUMN } from './constants';
import { vec2 } from './utils';

// Abstract class
class TreeRenderer {
  static root = null;

  static active = null;

  static p = null;

  static initialize = (p) => {
    TreeRenderer.p = p;
    TreeRenderer.root = new Tree(vec2(0, 0), vec2(p.width, p.height), DIRECTION_ROW, null, 2);
    TreeRenderer.loadAst();
    TreeRenderer.active = TreeRenderer.root;
  };

  static mouseDragged = () => {
    if (!TreeRenderer.active) return;
    TreeRenderer.active.update(TreeRenderer.p);
  };

  static draw = () => {
    if (!TreeRenderer.root) return;
    TreeRenderer.root.draw(TreeRenderer.p, TreeRenderer.active);
  };

  static toggleDirection = () => {
    if (!TreeRenderer.root) return;
    if (!TreeRenderer.active) return;
    const newDirection = TreeRenderer.active.direction === DIRECTION_COLUMN
      ? DIRECTION_ROW : DIRECTION_COLUMN;
    TreeRenderer.active.setDirection(newDirection);
  };

  static incrementSegments = () => {
    if (!TreeRenderer.root) return;
    if (!TreeRenderer.active) return;
    TreeRenderer.active.setSegments(TreeRenderer.active.segments + 1);
  };

  static decrementSegments = () => {
    if (!TreeRenderer.root) return;
    if (!TreeRenderer.active) return;
    TreeRenderer.active.setSegments(TreeRenderer.active.segments - 1);
  };

  static selectActive = () => {
    if (!TreeRenderer.root) return;
    const { p } = TreeRenderer;
    TreeRenderer.active = TreeRenderer.root.findActive(p.mouseX, p.mouseY);
  };

  static selectActivesParent = () => {
    if (!TreeRenderer.active) return;
    if (TreeRenderer.active.parent) {
      TreeRenderer.active = TreeRenderer.active.parent;
    }
  };

  static pickSegment = () => {
    if (!TreeRenderer.active) return;
    TreeRenderer.active.pickSegment(TreeRenderer.p);
  };

  static popGhost = () => {
    if (!TreeRenderer.active) return;
    TreeRenderer.active.popGhost();
  }

  static pushGhost = (type) => () => {
    if (!TreeRenderer.active) return;
    TreeRenderer.active.pushGhost(type);
  }

  static dumpAst = (writeLocalStorage = false) => {
    if (!TreeRenderer.root) {
      return {
        flex: 1,
        direction: 'row',
        children: [],
      };
    }
    const ast = TreeRenderer.root.toJson();
    if (writeLocalStorage) {
      localStorage.setItem('ast', JSON.stringify(ast));
    }
    return ast;
  }

  static loadAst = (ast = null) => {
    if (!TreeRenderer.root) return;
    Tree.id = 0;
    if (ast === null) {
      const serialAst = localStorage.getItem('ast');
      if (serialAst) {
        const validAst = JSON.parse(serialAst);
        TreeRenderer.root.fromJson(validAst);
        TreeRenderer.active = TreeRenderer.root;
      }
    } else {
      TreeRenderer.root.fromJson(ast);
      TreeRenderer.active = TreeRenderer.root;
    }
  }
}

export default TreeRenderer;
