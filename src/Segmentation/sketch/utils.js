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

export const isPointInAabb = (p, a, b) => {
  const isWithinX = p.x >= a.x && p.x <= b.x;
  const isWithinY = p.y >= a.y && p.y <= b.y;

  return isWithinX && isWithinY;
};

export const vec2 = (x, y) => ({ x, y });

// https://gist.github.com/engelen/fbce4476c9e68c52ff7e5c2da5c24a28
export function argmMin(array) {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] < r[0] ? a : r))[1];
}

export const findDistance1D = (a, b, axis) => Math.abs(a[axis] - b[axis]);

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export const cumulativeSum = (arr) => arr.reduce((r, a) => {
  r.push(((r.length && r[r.length - 1]) || 0) + a);
  return r;
}, []);
