import prettier from 'prettier';

import generate from './generate-jsx';
import { hasGhosts, noGhosts } from './sample-ast';

describe('generate-jss', () => {
  it('should generate JSS from ast', () => {
    const ast = hasGhosts;
    const code = generate(ast);
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "import React from 'react';
      import PropTypes from 'prop-types';

      import makeStyles from '@material-ui/core/styles/makeStyles';

      import './debug.css'; // For debugging

      const useStyles = makeStyles({
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
        ghost2: {
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
        ghost3: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        ghost4: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      });

      const MyComponent = ({ prop1, prop2, prop3, prop4 }) => {
        const classes = useStyles({ prop1, prop2, prop3, prop4 });
        return (
          <div className={classes.wrappert0}>
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
                TODO
              </div>
            </div>
          </div>
        );
      };

      MyComponent.propTypes = {
        prop1: PropTypes.string.isRequired,
        prop2: PropTypes.string.isRequired,
        TODO,
        TODO,
      };

      export default MyComponent;
      "
    `);
  });

  it('should generate JSS from ast', () => {
    const ast = noGhosts;
    const code = generate(ast);
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "import React from 'react';
      import PropTypes from 'prop-types';

      import makeStyles from '@material-ui/core/styles/makeStyles';

      import './debug.css'; // For debugging

      const useStyles = makeStyles({
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
      });

      const MyComponent = () => {
        const classes = useStyles();
        return (
          <div className={classes.wrappert0}>
            <div className={classes.wrappert1}>
              <div className={classes.wrappert11}>.</div>

              <div className={classes.wrappert12}>.</div>
            </div>

            <div className={classes.wrappert2}>
              <div className={classes.wrappert21}>.</div>

              <div className={classes.wrappert22}>.</div>
            </div>
          </div>
        );
      };

      MyComponent.propTypes = {};

      export default MyComponent;
      "
    `);
  });
});
