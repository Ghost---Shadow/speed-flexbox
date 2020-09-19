import { LABEL_GHOST } from '../../../constants/types';
import { generateGhostPropName } from './utils';

const labelGhostFormatter = (ghost) => {
  const name = generateGhostPropName(ghost);

  return `${name}: PropTypes.string.isRequired`;
};

const generateHelper = (ast) => {
  const ghostFormatterLookup = {
    [LABEL_GHOST]: labelGhostFormatter,
  };

  const ghostPropArr = ast.ghosts.map((ghost) => ghostFormatterLookup[ghost.type](ghost));
  const childStringArr = ast.children
    .map((childAst) => generateHelper(childAst))
    .reduce((acc, next) => acc.concat(next), []);

  return ghostPropArr.concat(childStringArr);
};

const generate = (ast) => {
  const arr = generateHelper(ast);
  if (arr.length) {
    return `${arr.join(',\n')}`;
  }
  return '';
};

export default generate;
