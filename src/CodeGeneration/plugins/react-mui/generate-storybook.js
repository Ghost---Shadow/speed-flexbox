import { BUTTON_GHOST, INPUT_FIELD_GHOST, LABEL_GHOST } from '../../../constants/types';
import { generateGhostPropName } from './utils';

const labelGhostFormatter = (ghost) => {
  const name = generateGhostPropName(ghost);

  return `${name}={text('${name}','placeholder_${name}')}`;
};

const buttonGhostFormatter = (ghost) => {
  const name = generateGhostPropName(ghost);

  return `${name}={action('${name}OnClick')}`;
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

  const code = `
  import React from 'react';
  import { action } from '@storybook/addon-actions';
  import { withKnobs, text } from '@storybook/addon-knobs';

  import MyComponent from './MyComponent';
  
  export default {
    title: 'MyComponent',
    component: MyComponent,
    decorators: [withKnobs],
  };
  
  export const normal = () => (
    <MyComponent 
      ${arr.join('\n')}
    />
  );

  normal.story = { name: 'normal' };
  
  `;
  return code;
};

export default generate;
