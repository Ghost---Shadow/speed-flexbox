import prettier from 'prettier';

import generate from './generate-props';
import {
  DIRECTION_ROW,
  DIRECTION_COLUMN,
} from '../../../Segmentation/sketch/constants';
import { LABEL_GHOST } from '../../../constants/types';

describe('generate-props', () => {
  it('should generate props from ast', () => {
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
    const code = `${generate(ast)}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot(`
      "{
        prop1, prop2, prop3;
      }
      "
    `);
  });
  it('should not crash if no ghosts', () => {
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
              ghosts: [],
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
              ghosts: [],
            },
          ],
          ghosts: [],
        },
      ],
      ghosts: [],
    };
    const code = `${generate(ast)}`;
    const prettyCode = prettier.format(code, {
      parser: 'babel',
      singleQuote: true,
    });
    expect(prettyCode).toMatchInlineSnapshot('""');
  });
});
