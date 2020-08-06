import { DIRECTION_ROW, DIRECTION_COLUMN } from './constants';

export const interp = (a, b, t) => a * (1 - t) + b * t;

export const interp2D = (a, b, t) => ({
  x: interp(a.x, b.x, t),
  y: interp(a.y, b.y, t),
});

export const interp1D = (a, b, t, direction) => {
  const interpV = interp2D(a, b, t);
  const lut = {
    [DIRECTION_ROW]: { x: interpV.x, y: b.y },
    [DIRECTION_COLUMN]: { y: interpV.y, x: b.x },
  };
  return lut[direction];
};
