import { BUTTON_GHOST, INPUT_FIELD_GHOST, LABEL_GHOST } from '../../../constants/types';
import { generateGhostPropName } from './utils';

const labelGhostFormatter = (ghost) => {
  const name = generateGhostPropName(ghost);

  return `${name}: PropTypes.string.isRequired`;
};

const buttonGhostFormatter = (ghost) => {
  const name = generateGhostPropName(ghost);

  return `${name}: PropTypes.func.isRequired`;
};

const generateHelper = (ast) => {
  const ghostFormatterLookup = {
    [LABEL_GHOST]: labelGhostFormatter,
    [BUTTON_GHOST]: buttonGhostFormatter,
    [INPUT_FIELD_GHOST]: () => null,
  };

  const ghostPropArr = ast.ghosts
    .map((ghost) => ghostFormatterLookup[ghost.type](ghost))
    .filter((g) => g);
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
