import prettier from 'prettier';

import generate from './generate-props-types';
import { hasGhosts, noGhosts } from './sample-ast';

describe('generate-props', () => {
  it('should generate props from ast', () => {
    const ast = hasGhosts;
    const code = `foo = {${generate(ast)}}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "foo = {
        prop1: PropTypes.string.isRequired,
        prop2: PropTypes.string.isRequired,
        TODO,
        TODO,
      };
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
