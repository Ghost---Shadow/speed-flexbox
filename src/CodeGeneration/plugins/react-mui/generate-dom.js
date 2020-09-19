import { LABEL_GHOST } from '../../../constants/types';
import { generateClassName } from './utils';

const labelGhostFormatter = (ghost) => `<div className={classes.ghost${ghost.id}}>{prop${ghost.id}}</div>`;

const generate = (ast) => {
  const ghostFormatterLookup = {
    [LABEL_GHOST]: labelGhostFormatter,
  };

  const ghostDoms = ast.ghosts.map((ghost) => ghostFormatterLookup[ghost.type](ghost));
  const innerDom = ghostDoms.length ? ghostDoms : ['.'];

  const childStringArr = ast.children.length === 0 ? innerDom : ast.children.map(generate);

  const className = generateClassName(ast);

  const code = `
  <div className={classes.${className}}>
    ${childStringArr.join('')}
  </div>
  `;
  return code;
};

export default generate;
