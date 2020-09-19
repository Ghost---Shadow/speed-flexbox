import Tree from './Tree';
import { DIRECTION_ROW, DIRECTION_COLUMN } from './constants';
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
  describe('pickSegment', () => {
    it('should find the indexes of two closest children (first child left half)', () => {
      const t0 = new Tree(vec2(0, 0), vec2(3, 3), DIRECTION_ROW, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(1, 3), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 0), vec2(2, 3), DIRECTION_ROW, t0, 1);
      const t3 = new Tree(vec2(2, 0), vec2(3, 3), DIRECTION_ROW, t0, 1);

      t0.children = [t1, t2, t3];
      const p = { mouseX: 0.25, mouseY: 0.25 };
      t0.pickSegment(p);
      expect(t0.leftChildIndex).toBe(0);
      expect(t0.rightChildIndex).toBe(1);
    });
    it('should find the indexes of two closest children (first child right half)', () => {
      const t0 = new Tree(vec2(0, 0), vec2(3, 3), DIRECTION_ROW, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(1, 3), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 0), vec2(2, 3), DIRECTION_ROW, t0, 1);
      const t3 = new Tree(vec2(2, 0), vec2(3, 3), DIRECTION_ROW, t0, 1);

      t0.children = [t1, t2, t3];
      const p = { mouseX: 0.75, mouseY: 0.75 };
      t0.pickSegment(p);
      expect(t0.leftChildIndex).toBe(0);
      expect(t0.rightChildIndex).toBe(1);
    });
    it('should find the indexes of two closest children (last child left half)', () => {
      const t0 = new Tree(vec2(0, 0), vec2(3, 3), DIRECTION_ROW, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(1, 3), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 0), vec2(2, 3), DIRECTION_ROW, t0, 1);
      const t3 = new Tree(vec2(2, 0), vec2(3, 3), DIRECTION_ROW, t0, 1);

      t0.children = [t1, t2, t3];
      const p = { mouseX: 2.25, mouseY: 2.25 };
      t0.pickSegment(p);
      expect(t0.leftChildIndex).toBe(1);
      expect(t0.rightChildIndex).toBe(2);
    });
    it('should find the indexes of two closest children (last child right half)', () => {
      const t0 = new Tree(vec2(0, 0), vec2(3, 3), DIRECTION_ROW, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(1, 3), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 0), vec2(2, 3), DIRECTION_ROW, t0, 1);
      const t3 = new Tree(vec2(2, 0), vec2(3, 3), DIRECTION_ROW, t0, 1);

      t0.children = [t1, t2, t3];
      const p = { mouseX: 2.75, mouseY: 2.75 };
      t0.pickSegment(p);
      expect(t0.leftChildIndex).toBe(1);
      expect(t0.rightChildIndex).toBe(2);
    });
    it('should find the indexes of two closest children column (middle child left half)', () => {
      const t0 = new Tree(vec2(0, 0), vec2(3, 3), DIRECTION_COLUMN, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(3, 1), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(0, 1), vec2(3, 2), DIRECTION_ROW, t0, 1);
      const t3 = new Tree(vec2(0, 2), vec2(3, 3), DIRECTION_ROW, t0, 1);

      t0.children = [t1, t2, t3];
      const p = { mouseX: 1.25, mouseY: 1.25 };
      t0.pickSegment(p);
      expect(t0.leftChildIndex).toBe(0);
      expect(t0.rightChildIndex).toBe(1);
    });
  });
  describe('moveActiveSegment', () => {
    let backupPadding = null;
    beforeAll(() => {
      backupPadding = Tree.PADDING;
    });
    beforeEach(() => {
      Tree.PADDING = 0;
    });
    afterAll(() => {
      Tree.PADDING = backupPadding;
    });
    it('should not crash if less than 2 children', () => {
      const t0 = new Tree(vec2(0, 0), vec2(3, 3), DIRECTION_ROW, null, 1);
      const p = { mouseX: 0.25, mouseY: 0.25 };
      t0.moveActiveSegment(p);
    });
    it('should move the start and end of picked segment', () => {
      const t0 = new Tree(vec2(0, 0), vec2(2, 2), DIRECTION_ROW, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(1, 2), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 0), vec2(2, 2), DIRECTION_ROW, t0, 1);

      t0.children = [t1, t2];
      const p = { mouseX: 0.25, mouseY: 0.25 };
      t0.pickSegment(p);
      t0.moveActiveSegment(p);
      expect(t0.children[0].end).toEqual(vec2(0.25, 2));
      expect(t0.children[1].start).toEqual(vec2(0.25, 0));
    });
    it('should not move beyond upper boundary (row)', () => {
      const t0 = new Tree(vec2(0, 0), vec2(2, 2), DIRECTION_ROW, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(1, 2), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 0), vec2(2, 2), DIRECTION_ROW, t0, 1);

      t0.children = [t1, t2];
      const p1 = { mouseX: 0.25, mouseY: 0.25 };
      const p2 = { mouseX: 3, mouseY: 3 };
      Tree.PADDING = 0.1;
      t0.pickSegment(p1);
      t0.moveActiveSegment(p2);
      expect(t0.children[0].end).toEqual(vec2(1.9, 2));
      expect(t0.children[1].start).toEqual(vec2(1.9, 0));
    });
    it('should not move beyond lower boundary (column)', () => {
      const t0 = new Tree(vec2(0, 0), vec2(2, 2), DIRECTION_COLUMN, null, 2);

      const t1 = new Tree(vec2(1, 1), vec2(2, 2), DIRECTION_ROW, t0, 1);
      const t2 = new Tree(vec2(1, 1), vec2(2, 3), DIRECTION_ROW, t0, 1);

      t0.children = [t1, t2];
      const p1 = { mouseX: 0.25, mouseY: 0.25 };
      const p2 = { mouseX: 0, mouseY: 0 };
      Tree.PADDING = 0.1;
      t0.pickSegment(p1);
      t0.moveActiveSegment(p2);
      expect(t0.children[0].end).toEqual(vec2(2, 1.1));
      expect(t0.children[1].start).toEqual(vec2(1, 1.1));
    });
  });
  describe('toJson', () => {
    it('should serialize to a JSON', () => {
      const t0 = new Tree(vec2(0, 0), vec2(4, 2), DIRECTION_ROW, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(1, 2), DIRECTION_ROW, t0, 2);
      const t2 = new Tree(vec2(1, 0), vec2(4, 2), DIRECTION_COLUMN, t0, 2);

      const t11 = new Tree(vec2(0, 0), vec2(0.25, 2), DIRECTION_COLUMN, t1, 1);
      const t12 = new Tree(vec2(0.25, 0), vec2(1, 2), DIRECTION_COLUMN, t1, 1);

      const t21 = new Tree(vec2(1, 0), vec2(4, 1), DIRECTION_COLUMN, t2, 1);
      const t22 = new Tree(vec2(1, 1), vec2(4, 2), DIRECTION_COLUMN, t2, 1);

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

      const expected = {
        id: 't0',
        direction: DIRECTION_ROW,
        flex: 1,
        children: [
          {
            id: 't1',
            direction: DIRECTION_ROW,
            flex: 0.25,
            children: [
              {
                id: 't11',
                flex: 0.25,
                direction: DIRECTION_COLUMN,
                children: [],
                ghosts: [],
              },
              {
                id: 't12',
                flex: 0.75,
                direction: DIRECTION_COLUMN,
                children: [],
                ghosts: [],
              },
            ],
            ghosts: [],
          },
          {
            id: 't2',
            direction: DIRECTION_COLUMN,
            flex: 0.75,
            children: [
              {
                id: 't21',
                flex: 0.5,
                direction: DIRECTION_COLUMN,
                children: [],
                ghosts: [],
              },
              {
                id: 't22',
                flex: 0.5,
                direction: DIRECTION_COLUMN,
                children: [],
                ghosts: [],
              },
            ],
            ghosts: [],
          },
        ],
        ghosts: [],
      };

      expect(t0.toJson()).toEqual(expected);
    });
  });
  describe('fromJson', () => {
    it('should deserialize from a JSON', () => {
      const t0 = new Tree(vec2(0, 0), vec2(4, 2), DIRECTION_ROW, null, 2);

      const t1 = new Tree(vec2(0, 0), vec2(1, 2), DIRECTION_ROW, t0, 2);
      const t2 = new Tree(vec2(1, 0), vec2(4, 2), DIRECTION_COLUMN, t0, 2);

      const t11 = new Tree(vec2(0, 0), vec2(0.25, 2), DIRECTION_COLUMN, t1, 1);
      const t12 = new Tree(vec2(0.25, 0), vec2(1, 2), DIRECTION_COLUMN, t1, 1);

      const t21 = new Tree(vec2(1, 0), vec2(4, 1), DIRECTION_COLUMN, t2, 1);
      const t22 = new Tree(vec2(1, 1), vec2(4, 2), DIRECTION_COLUMN, t2, 1);

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

      const ast = {
        id: 't0',
        direction: DIRECTION_ROW,
        flex: 1,
        children: [
          {
            id: 't1',
            direction: DIRECTION_ROW,
            flex: 0.25,
            children: [
              {
                id: 't11',
                flex: 0.25,
                direction: DIRECTION_COLUMN,
                children: [],
                ghosts: [],
              },
              {
                id: 't12',
                flex: 0.75,
                direction: DIRECTION_COLUMN,
                children: [],
                ghosts: [],
              },
            ],
            ghosts: [],
          },
          {
            id: 't2',
            direction: DIRECTION_COLUMN,
            flex: 0.75,
            children: [
              {
                id: 't21',
                flex: 0.5,
                direction: DIRECTION_COLUMN,
                children: [],
                ghosts: [],
              },
              {
                id: 't22',
                flex: 0.5,
                direction: DIRECTION_COLUMN,
                children: [],
                ghosts: [],
              },
            ],
            ghosts: [],
          },
        ],
        ghosts: [],
      };

      const newT0 = new Tree(vec2(0, 0), vec2(4, 2), DIRECTION_COLUMN, null, 1);
      newT0.fromJson(ast);
      expect(newT0).toEqual(t0);
    });
  });
});
