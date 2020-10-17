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
      "const [ghostState04, setGhostState04] = React.useState('');
      const [ghostState05, setGhostState05] = React.useState('');
      "
    `);
  });
});
