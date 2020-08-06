import { DIRECTION_ROW, DIRECTION_COLUMN } from './constants';

export const interp = (a, b, t) => a * (1 - t) + b * t;

export const interp2D = (a, b, t) => ({
  x: interp(a.x, b.x, t),
  y: interp(a.y, b.y, t),
});

export const interp1D = (a, b, t, direction, start) => {
  const interpV = interp2D(a, b, t);
  const c = start ? a : b;
  const lut = {
    [DIRECTION_ROW]: { x: interpV.x, y: c.y },
    [DIRECTION_COLUMN]: { y: interpV.y, x: c.x },
  };
  return lut[direction];
};
