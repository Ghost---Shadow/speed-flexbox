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
      "<div className={classes.wrappert0}>
        <div className={classes.wrappert1}>
          <div className={classes.wrappert11}>
            <div className={classes.ghost1}>{prop1}</div>
            <div className={classes.ghost2}>{prop2}</div>
          </div>

          <div className={classes.wrappert12}>.</div>
        </div>

        <div className={classes.wrappert2}>
          <div className={classes.wrappert21}>.</div>

          <div className={classes.wrappert22}>
            <button type=\\"button\\" className={classes.ghost3} onClick={prop3}>
              Button 3
            </button>

            <input
              type=\\"text\\"
              className={classes.ghost4}
              onChange={(e) => setGhostState4(e.target.value)}
              value={ghostState4}
            />
          </div>
        </div>
      </div>;
      "
    `);
  });
});
