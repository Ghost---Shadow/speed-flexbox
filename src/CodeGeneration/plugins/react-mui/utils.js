import { BUTTON_GHOST, INPUT_FIELD_GHOST, LABEL_GHOST } from '../../../constants/types';

export const generateClassName = (ast) => `wrapper${ast.id}`;

export const generateGhostClassName = (ghost) => `ghost${ghost.id}`;

export const generateGhostPropName = (ghost) => ({
  [LABEL_GHOST]: `prop${ghost.id}`,
  [BUTTON_GHOST]: `prop${ghost.id}`,
  [INPUT_FIELD_GHOST]: null,
}[ghost.type]);

export const generateGhostState = (ghost) => ({
  [LABEL_GHOST]: null,
  [BUTTON_GHOST]: null,
  [INPUT_FIELD_GHOST]: {
    value: `ghostState${ghost.id}`,
    setter: `setGhostState${ghost.id}`,
  },
}[ghost.type]);

export const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
