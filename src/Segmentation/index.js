import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import { Divider } from '@material-ui/core';
import sketch from '../sketch';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
  },
  mainWrapper: {
    flex: 7,
    display: 'flex',
    justifyContent: 'center',
  },
  drawerWrapper: {
    flex: 2,
    maxWidth: '300px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
  },
}));

const Controls = () => {
  const classes = useStyles();
  return (
    <div className={classes.controls}>
      <Typography>Controls</Typography>
      <Typography>W: Go up one parent</Typography>
      <Typography>S: Select child on cursor</Typography>
      <Typography>D: Increase subdivision</Typography>
      <Typography>A: Decrease subdivision</Typography>
      <Typography>R: Switch direction</Typography>
    </div>
  );
};

const Segmentation = () => {
  const classes = useStyles();

  const defaultWidth = window.innerWidth * 0.7;
  const defaultHeight = (defaultWidth / 16) * 9;

  return (
    <div className={classes.wrapper}>
      <div className={classes.mainWrapper}>
        <P5Wrapper sketch={sketch} width={defaultWidth} height={defaultHeight} />
      </div>
      <Paper className={classes.drawerWrapper}>
        <Controls />
        <Divider />
      </Paper>
    </div>
  );
};

export default Segmentation;
