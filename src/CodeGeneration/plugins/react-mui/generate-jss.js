import { generateClassName, round } from './utils';

const generateHelper = (ast) => {
  const name = generateClassName(ast);
  const self = `
    ${name}: {
      display: 'flex',
      flexDirection: '${ast.direction}',
      flex: ${round(ast.flex)},
    }
  `;

  const childStringArr = ast.children.map((childAst) => generateHelper(childAst));

  return [self].concat(childStringArr);
};

const generate = (ast) => {
  const arr = generateHelper(ast);
  return `{${arr.join(',\n')}}`;
};

export default generate;
