import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

import generateJsx from './generate-jsx';
import generateStorybook from './generate-storybook';
import generateDebugCss from './generate-debug-css';

const generate = (ast) => {
  const jsxCode = generateJsx(ast);
  const storybookCode = generateStorybook(ast);
  const debugCssCode = generateDebugCss();
  const opts = { parser: 'babel', plugins: [parserBabel] };
  const files = {
    'MyComponent.js': prettier.format(jsxCode, opts),
    'MyComponent.stories.js': prettier.format(storybookCode, opts),
    'debug.css': debugCssCode,
  };

  return {
    language: 'jsx',
    files,
  };
};

export default generate;
