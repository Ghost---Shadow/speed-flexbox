import prettier from 'prettier';

import generate from './generate-state';
import { hasGhosts } from './sample-ast';

describe('generate-jss', () => {
  it('should generate JSS from ast', () => {
    const ast = hasGhosts;
    const code = `${generate(ast)}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "const [ghostState4, setGhostState4] = React.useState('');
      const [ghostState5, setGhostState5] = React.useState('');
      "
    `);
  });
});
