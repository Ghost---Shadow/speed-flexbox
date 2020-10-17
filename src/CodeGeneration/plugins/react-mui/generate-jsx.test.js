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

      // import './debug.css'; // For debugging

      const useStyles = makeStyles({
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
      });

      const MyComponent = ({ prop01, prop02, prop03 }) => {
        const classes = useStyles({ prop01, prop02, prop03 });
        const [ghostState04, setGhostState04] = React.useState('');
        const [ghostState05, setGhostState05] = React.useState('');
        return (
          <div className={classes.wrapper00}>
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
          </div>
        );
      };

      MyComponent.propTypes = {
        prop01: PropTypes.string.isRequired,
        prop02: PropTypes.string.isRequired,
        prop03: PropTypes.func.isRequired,
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

      // import './debug.css'; // For debugging

      const useStyles = makeStyles({
        wrapper00: {
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
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
      });

      const MyComponent = () => {
        const classes = useStyles();

        return (
          <div className={classes.wrapper00}>
            <div className={classes.wrapper01}>
              <div className={classes.wrapper11}>.</div>

              <div className={classes.wrapper12}>.</div>
            </div>

            <div className={classes.wrapper02}>
              <div className={classes.wrapper21}>.</div>

              <div className={classes.wrapper22}>.</div>
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
