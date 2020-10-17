import { BUTTON_GHOST } from '../../../constants/types';
import {
  generateClassName, generateGhostClassName, round, toRem,
} from './utils';

const buttonGhostFormatter = (ghost) => {
  const name = generateGhostClassName(ghost);
  return `
  ${name}:{
    backgroundColor: 'transparent'
  }
`;
};

const defaultGhostFormatter = (ghost) => {
  const name = generateGhostClassName(ghost);
  return `
  ${name}: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  `;
};

const ghostFormatter = (ghost) => {
  const formatter = {
    [BUTTON_GHOST]: buttonGhostFormatter,
  }[ghost.type] || defaultGhostFormatter;

  return formatter(ghost);
};

const rootNodeDimensions = (ast) => {
  if (!ast.isRoot || !ast.width || !ast.height) return '';

  return `minWidth: '${round(toRem(ast.width))}rem',
    minHeight: '${round(toRem(ast.height))}rem',
  `;
};

const generateHelper = (ast) => {
  const name = generateClassName(ast);
  const self = `
    ${name}: {
      display: 'flex',
      flexDirection: '${ast.direction}',
      flex: ${round(ast.flex)},
      ${rootNodeDimensions(ast)}
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
