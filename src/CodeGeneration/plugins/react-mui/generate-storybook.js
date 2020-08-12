const generate = () => {
  const code = `
  import React from 'react';
import MyComponent from './MyComponent';

export const MyComponent = () => <MyComponent />;
  `;
  return code;
};

export default generate;
