import prettier from 'prettier';

import generate from './generate-dom';
import { hasGhosts } from './sample-ast';

describe('generate-dom', () => {
  it('should generate dom from ast', () => {
    const ast = hasGhosts;
    const code = `${generate(ast)}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "<div className={classes.wrapper00}>
        <div className={classes.wrapper01}>
          <div className={classes.wrapper11}>
            <div className={classes.ghost01}>{prop01}</div>
            <div className={classes.ghost02}>{prop02}</div>
          </div>

          <div className={classes.wrapper12}>.</div>
        </div>

        <div className={classes.wrapper02}>
          <div className={classes.wrapper21}>.</div>

          <div className={classes.wrapper22}>
            <button type=\\"button\\" className={classes.ghost03} onClick={prop03}>
              Button 3
            </button>

            <input
              type=\\"text\\"
              className={classes.ghost04}
              onChange={(e) => setGhostState04(e.target.value)}
              value={ghostState04}
            />

            <input
              type=\\"text\\"
              className={classes.ghost05}
              onChange={(e) => setGhostState05(e.target.value)}
              value={ghostState05}
            />
          </div>
        </div>
      </div>;
      "
    `);
  });
});
