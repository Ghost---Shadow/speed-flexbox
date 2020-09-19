import { BUTTON_GHOST, INPUT_FIELD_GHOST, LABEL_GHOST } from '../../../constants/types';
import {
  generateClassName,
  generateGhostClassName,
  generateGhostPropName,
  generateGhostState,
} from './utils';

const labelGhostFormatter = (ghost) => {
  const className = generateGhostClassName(ghost);
  const textProp = generateGhostPropName(ghost);

  return `
  <div className={classes.${className}}>
    {${textProp}}
  </div>`;
};

const buttonGhostFormatter = (ghost) => {
  const className = generateGhostClassName(ghost);
  const onClickProp = generateGhostPropName(ghost);

  return `
  <button type="button" className={classes.${className}} onClick={${onClickProp}}>
    Button ${ghost.id}
  </button>
  `;
};

const inputFieldGhostFormatter = (ghost) => {
  const className = generateGhostClassName(ghost);
  const { value, setter } = generateGhostState(ghost);

  return `
    <input 
      type="text"
      className={classes.${className}} 
      onChange={(e) => ${setter}(e.target.value)} 
      value={${value}} 
    />
  `;
};

const generate = (ast) => {
  const ghostFormatterLookup = {
    [LABEL_GHOST]: labelGhostFormatter,
    [BUTTON_GHOST]: buttonGhostFormatter,
    [INPUT_FIELD_GHOST]: inputFieldGhostFormatter,
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
