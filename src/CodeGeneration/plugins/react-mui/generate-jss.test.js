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
        wrappert0: {
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
        },
        wrappert1: {
          display: 'flex',
          flexDirection: 'row',
          flex: 0.25,
        },
        wrappert11: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.25,
        },
        ghost1: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        wrappert12: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.75,
        },
        wrappert2: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.75,
        },
        wrappert21: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.5,
        },
        wrappert22: {
          display: 'flex',
          flexDirection: 'column',
          flex: 0.5,
        },
        ghost2: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        ghost3: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      };
      "
    `);
  });
});
