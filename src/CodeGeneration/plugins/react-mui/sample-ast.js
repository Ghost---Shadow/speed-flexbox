import { BUTTON_GHOST, INPUT_FIELD_GHOST, LABEL_GHOST } from '../../../constants/types';
import { DIRECTION_COLUMN, DIRECTION_ROW } from '../../../Segmentation/sketch/constants';

export const hasGhosts = {
  id: 0,
  direction: DIRECTION_ROW,
  flex: 1,
  children: [
    {
      id: 1,
      direction: DIRECTION_ROW,
      flex: 0.25,
      children: [
        {
          id: 11,
          flex: 0.25,
          direction: DIRECTION_COLUMN,
          children: [],
          ghosts: [{ id: 1, type: LABEL_GHOST }, { id: 2, type: LABEL_GHOST }],
        },
        {
          id: 12,
          flex: 0.75,
          direction: DIRECTION_COLUMN,
          children: [],
          ghosts: [],
        },
      ],
      ghosts: [],
    },
    {
      id: 2,
      direction: DIRECTION_COLUMN,
      flex: 0.75,
      children: [
        {
          id: 21,
          flex: 0.5,
          direction: DIRECTION_COLUMN,
          children: [],
          ghosts: [],
        },
        {
          id: 22,
          flex: 0.5,
          direction: DIRECTION_COLUMN,
          children: [],
          ghosts: [
            { id: 3, type: BUTTON_GHOST },
            { id: 4, type: INPUT_FIELD_GHOST },
            { id: 5, type: INPUT_FIELD_GHOST },
          ],
        },
      ],
      ghosts: [],
    },
  ],
  ghosts: [],
};

export const noGhosts = {
  id: 0,
  direction: DIRECTION_ROW,
  flex: 1,
  children: [
    {
      id: 1,
      direction: DIRECTION_ROW,
      flex: 0.25,
      children: [
        {
          id: 11,
          flex: 0.25,
          direction: DIRECTION_COLUMN,
          children: [],
          ghosts: [],
        },
        {
          id: 12,
          flex: 0.75,
          direction: DIRECTION_COLUMN,
          children: [],
          ghosts: [],
        },
      ],
      ghosts: [],
    },
    {
      id: 2,
      direction: DIRECTION_COLUMN,
      flex: 0.75,
      children: [
        {
          id: 21,
          flex: 0.5,
          direction: DIRECTION_COLUMN,
          children: [],
          ghosts: [],
        },
        {
          id: 22,
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
