import { BUTTON_GHOST, INPUT_FIELD_GHOST, LABEL_GHOST } from '../../../constants/types';
import { generateGhostState } from './utils';

const inputFieldGhostFormatter = (ghost) => {
  const { value, setter } = generateGhostState(ghost);

  return `const [${value}, ${setter}] = React.useState('')`;
};

const generateHelper = (ast) => {
  const ghostFormatterLookup = {
    [LABEL_GHOST]: () => null,
    [BUTTON_GHOST]: () => null,
    [INPUT_FIELD_GHOST]: inputFieldGhostFormatter,
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
    return `${arr.join(';\n')}`;
  }
  return '';
};

export default generate;
