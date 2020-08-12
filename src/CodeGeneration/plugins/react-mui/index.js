import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

import generateJsx from './generate-jsx';
import generateStorybook from './generate-storybook';

const generate = (ast) => {
  const jsxCode = generateJsx(ast);
  const storybookCode = generateStorybook(ast);
  const opts = { parser: 'babel', plugins: [parserBabel] };
  const files = {
    'MyComponent.js': jsxCode,
    'MyComponent.stories.js': storybookCode,
  };

  Object.keys(files).forEach((fileName) => {
    files[fileName] = prettier.format(files[fileName], opts);
  });

  return {
    language: 'jsx',
    files,
  };
};

export default generate;
