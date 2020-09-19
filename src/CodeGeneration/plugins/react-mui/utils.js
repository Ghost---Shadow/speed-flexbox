export const generateClassName = (ast) => `wrapper${ast.id}`;
export const generateGhostClassName = (ghost) => `ghost${ghost.id}`;
export const generateGhostPropName = (ghost) => `prop${ghost.id}`;

export const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
