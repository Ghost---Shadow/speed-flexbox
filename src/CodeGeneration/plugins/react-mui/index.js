import generateJsx from './generate-jsx';
import generateStorybook from './generate-storybook';

const generate = (ast) => {
  const jsxCode = generateJsx(ast);
  const storybookCode = generateStorybook(ast);
  const files = {
    'MyComponent.js': jsxCode,
    'MyComponent.stories.js': storybookCode,
  };
  return {
    language: 'jsx',
    files,
  };
};

export default generate;
