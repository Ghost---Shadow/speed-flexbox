import { generateClassName, generateGhostClassName, round } from './utils';

const ghostFormatter = (ghost) => {
  const name = generateGhostClassName(ghost);
  return `
  ${name}: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
  `;
};

const generateHelper = (ast) => {
  const name = generateClassName(ast);
  const self = `
    ${name}: {
      display: 'flex',
      flexDirection: '${ast.direction}',
      flex: ${round(ast.flex)},
    }
  `;

  const ghostArr = ast.ghosts.map(ghostFormatter);
  const childStringArr = ast.children.map((childAst) => generateHelper(childAst));

  return [self].concat(ghostArr).concat(childStringArr);
};

const generate = (ast) => {
  const arr = generateHelper(ast);
  return `{${arr.join(',\n')}}`;
};

export default generate;
