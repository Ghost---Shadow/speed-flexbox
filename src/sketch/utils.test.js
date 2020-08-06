import {
  interp,
  interp1D,
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
    it('should interpolate row wise', () => {
      const a = { x: 1, y: 1 };
      const b = { x: 3, y: 3 };
      const t = 0.25;
      const actual = interp1D(a, b, t, DIRECTION_ROW);
      expect(actual).toEqual({ x: 1.5, y: 3 });
    });
    it('should interpolate column wise', () => {
      const a = { x: 1, y: 1 };
      const b = { x: 3, y: 3 };
      const t = 0.25;
      const actual = interp1D(a, b, t, DIRECTION_COLUMN);
      expect(actual).toEqual({ x: 3, y: 1.5 });
    });
  });
});
