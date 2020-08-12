export const generateClassName = (ast) => `wrapper${ast.id}`;

export const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
