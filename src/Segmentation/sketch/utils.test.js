import {
  interp,
  interp1D,
  isPointInAabb,
  vec2,
} from './utils';
import { DIRECTION_ROW, DIRECTION_COLUMN } from './constants';

describe('utils', () => {
  describe('interp', () => {
    it('should interpolate', () => {
      const a = 1;
      const b = 3;
      const t = 0.25;
      const actual = interp(a, b, t);
      expect(actual).toEqual(1.5);
    });
  });
  describe('interp1D', () => {
    it('should interpolate row wise start', () => {
      const a = vec2(1, 1);
      const b = vec2(3, 3);
      const t = 0.25;
      const actual = interp1D(a, b, t, DIRECTION_ROW, true);
      expect(actual).toEqual(vec2(1.5, 1));
    });
    it('should interpolate column wise end', () => {
      const a = vec2(1, 1);
      const b = vec2(3, 3);
      const t = 0.25;
      const actual = interp1D(a, b, t, DIRECTION_COLUMN, false);
      expect(actual).toEqual(vec2(3, 1.5));
    });
  });
  describe('isPointInAabb', () => {
    it('should return true if in the bounding box', () => {
      const p = vec2(2, 2);
      const a = vec2(1, 1);
      const b = vec2(3, 3);
      const actual = isPointInAabb(p, a, b);
      expect(actual).toBeTruthy();
    });
    it('should return false if x is outside', () => {
      const p = vec2(4, 2);
      const a = vec2(1, 1);
      const b = vec2(3, 3);
      const actual = isPointInAabb(p, a, b);
      expect(actual).toBeFalsy();
    });
    it('should return false if y is outside', () => {
      const p = vec2(2, 4);
      const a = vec2(1, 1);
      const b = vec2(3, 3);
      const actual = isPointInAabb(p, a, b);
      expect(actual).toBeFalsy();
    });
    it('should return false if x and y is outside', () => {
      const p = vec2(4, 4);
      const a = vec2(1, 1);
      const b = vec2(3, 3);
      const actual = isPointInAabb(p, a, b);
      expect(actual).toBeFalsy();
    });
    it('should return true if on the edge', () => {
      const p = vec2(1, 1);
      const a = vec2(1, 1);
      const b = vec2(3, 3);
      const actual = isPointInAabb(p, a, b);
      expect(actual).toBeTruthy();
    });
  });
});
