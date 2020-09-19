import prettier from 'prettier';

import generate from './generate-jsx';
import {
  DIRECTION_ROW,
  DIRECTION_COLUMN,
} from '../../../Segmentation/sketch/constants';
import { LABEL_GHOST } from '../../../constants/types';

describe('generate-jss', () => {
  it('should generate JSS from ast', () => {
    const ast = {
      id: 't0',
      direction: DIRECTION_ROW,
      flex: 1,
      children: [
        {
          id: 't1',
          direction: DIRECTION_ROW,
          flex: 0.25,
          children: [
            {
              id: 't11',
              flex: 0.25,
              direction: DIRECTION_COLUMN,
              children: [],
              ghosts: [{ id: 1, type: LABEL_GHOST }],
            },
            {
              id: 't12',
              flex: 0.75,
              direction: DIRECTION_COLUMN,
              children: [],
              ghosts: [],
            },
          ],
          ghosts: [],
        },
        {
          id: 't2',
          direction: DIRECTION_COLUMN,
          flex: 0.75,
          children: [
            {
              id: 't21',
              flex: 0.5,
              direction: DIRECTION_COLUMN,
              children: [],
              ghosts: [],
            },
            {
              id: 't22',
              flex: 0.5,
              direction: DIRECTION_COLUMN,
              children: [],
              ghosts: [
                { id: 2, type: LABEL_GHOST },
                { id: 3, type: LABEL_GHOST },
              ],
            },
          ],
          ghosts: [],
        },
      ],
      ghosts: [],
    };
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
      });

      const MyComponent = ({ prop1, prop2, prop3 }) => {
        const classes = useStyles({ prop1, prop2, prop3 });
        return (
          <div className={classes.wrappert0}>
            <div className={classes.wrappert1}>
              <div className={classes.wrappert11}>
                <div className={classes.ghost1}>{prop1}</div>
              </div>

              <div className={classes.wrappert12}>.</div>
            </div>

            <div className={classes.wrappert2}>
              <div className={classes.wrappert21}>.</div>

              <div className={classes.wrappert22}>
                <div className={classes.ghost2}>{prop2}</div>
                <div className={classes.ghost3}>{prop3}</div>
              </div>
            </div>
          </div>
        );
      };

      MyComponent.propTypes = {
        prop1: PropTypes.string.isRequired,
        prop2: PropTypes.string.isRequired,
        prop3: PropTypes.string.isRequired,
      };

      export default MyComponent;
      "
    `);
  });
});
