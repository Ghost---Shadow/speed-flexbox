import prettier from 'prettier';

import generate from './generate-jss';
import { hasGhosts } from './sample-ast';

describe('generate-jss', () => {
  it('should generate JSS from ast', () => {
    const ast = hasGhosts;
    const code = `const styles = ${generate(ast)}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "const styles = {
        wrapper00: {
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          minWidth: '6.25rem',
          minHeight: '6.25rem',
        },
        wrapper01: {
          display: 'flex',
          flexDirection: 'row',
          flex: 0.25,
        },
        wrapper11: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.25,
        },
        ghost01: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        ghost02: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        wrapper12: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.75,
        },
        wrapper02: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.75,
        },
        wrapper21: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.5,
        },
        wrapper22: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.5,
        },
        ghost03: {
          backgroundColor: 'transparent',
        },
        ghost04: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        ghost05: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      };
      "
    `);
  });
});
