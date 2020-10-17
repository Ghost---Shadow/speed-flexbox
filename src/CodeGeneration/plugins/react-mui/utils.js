import { BUTTON_GHOST, INPUT_FIELD_GHOST, LABEL_GHOST } from '../../../constants/types';

const padId = (id) => `${id}`.padStart(2, '0');

export const generateClassName = (ast) => `wrapper${padId(ast.id)}`;

export const generateGhostClassName = (ghost) => `ghost${padId(ghost.id)}`;

export const generateGhostPropName = (ghost) => ({
  [LABEL_GHOST]: `prop${padId(ghost.id)}`,
  [BUTTON_GHOST]: `prop${padId(ghost.id)}`,
  [INPUT_FIELD_GHOST]: null,
}[ghost.type]);

export const generateGhostState = (ghost) => ({
  [LABEL_GHOST]: null,
  [BUTTON_GHOST]: null,
  [INPUT_FIELD_GHOST]: {
    value: `ghostState${padId(ghost.id)}`,
    setter: `setGhostState${padId(ghost.id)}`,
  },
}[ghost.type]);

export const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

// http://www.standardista.com/px-to-rem-conversion-if-root-font-size-is-16px/
export const toRem = (px) => px / 16;
