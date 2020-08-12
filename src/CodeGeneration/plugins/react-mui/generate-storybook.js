const generate = () => {
  const code = `
  import React from 'react';
  // import { action } from '@storybook/addon-actions';
  import { withKnobs } from '@storybook/addon-knobs';

  import MyComponent from './MyComponent';
  
  export default {
    title: 'MyComponent',
    component: MyComponent,
    decorators: [withKnobs],
  };
  
  export const normal = () => (
    <MyComponent />
  );

  normal.story = { name: 'normal' };
  
  `;
  return code;
};

export default generate;
