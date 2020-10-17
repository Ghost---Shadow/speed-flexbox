import prettier from 'prettier';

import generate from './generate-props';
import { hasGhosts, noGhosts } from './sample-ast';

describe('generate-props', () => {
  it('should generate props from ast', () => {
    const ast = hasGhosts;
    const code = `${generate(ast)}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "{
        prop01, prop02, prop03;
      }
      "
    `);
  });
  it('should not crash if no ghosts', () => {
    const ast = noGhosts;
    const code = `${generate(ast)}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot('""');
  });
});
