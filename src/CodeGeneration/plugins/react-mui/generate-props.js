import { generateGhostPropName } from './utils';

const generateHelper = (ast) => {
  const ghostPropArr = ast.ghosts.map(generateGhostPropName);
  const childStringArr = ast.children
    .map((childAst) => generateHelper(childAst))
    .reduce((acc, next) => acc.concat(next), []);

  return ghostPropArr.concat(childStringArr);
};

const generate = (ast) => {
  const arr = generateHelper(ast);
  if (arr.length) {
    return `{${arr.join(',\n')}}`;
  }
  return '';
};

export default generate;
