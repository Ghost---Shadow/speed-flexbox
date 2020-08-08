import Tree from './Tree';
import { DIRECTION_ROW } from './constants';
import { vec2 } from './utils';

describe('Tree', () => {
  describe('findActive', () => {
    it('should return the tree if leaf and within AABB', () => {
      const t = new Tree(vec2(0, 0), vec2(2, 2), DIRECTION_ROW, null, 1);
      expect(t.findActive(1, 1)).toBe(t);
    });
    it('should return the child which within AABB', () => {
      const t0 = new Tree(vec2(0, 0), vec2(2, 2), DIRECTION_ROW, null, 2);
      const t1 = new Tree(vec2(0, 0), vec2(1, 2), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 0), vec2(2, 2), DIRECTION_ROW, t0, 1);
      t0.children = [t1, t2];
      expect(t0.findActive(0.5, 0.5)).toBe(t1);
    });
    it('should return falsy if no valid child', () => {
      const t0 = new Tree(vec2(0, 0), vec2(2, 2), DIRECTION_ROW, null, 2);
      const t1 = new Tree(vec2(0, 0), vec2(1, 2), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 0), vec2(2, 2), DIRECTION_ROW, t0, 1);
      t0.children = [t1, t2];
      expect(t0.findActive(4, 4)).toBeFalsy();
    });
    it('should return correct child at depth', () => {
      const t0 = new Tree(vec2(0, 0), vec2(2, 2), DIRECTION_ROW, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(1, 2), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 0), vec2(2, 2), DIRECTION_ROW, t0, 1);

      const t11 = new Tree(vec2(0, 0), vec2(0.5, 2), DIRECTION_ROW, t1, 1);
      const t12 = new Tree(vec2(0.5, 0), vec2(1, 2), DIRECTION_ROW, t1, 1);

      const t21 = new Tree(vec2(1, 0), vec2(1.5, 2), DIRECTION_ROW, t2, 1);
      const t22 = new Tree(vec2(1.5, 0), vec2(2, 2), DIRECTION_ROW, t2, 1);

      t0.children = [t1, t2];
      t1.children = [t11, t12];
      t2.children = [t21, t22];

      t0.id = 't0';
      t1.id = 't1';
      t2.id = 't2';
      t11.id = 't11';
      t12.id = 't12';
      t21.id = 't21';
      t22.id = 't22';

      expect(t0.findActive(1.25, 0.5).id).toBe('t21');
    });
  });
});
