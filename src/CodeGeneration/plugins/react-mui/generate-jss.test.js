import prettier from 'prettier';

import generate from './generate-jss';
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
