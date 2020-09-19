import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import sketch from './sketch';
import useWindowDimensions from '../useWindowDimensions';
import TreeRenderer from './sketch/TreeRenderer';

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
      <Divider />
      <Typography>W: Go up one parent</Typography>
      <Typography>S: Select child on cursor</Typography>
      <Typography>D: Increase subdivision</Typography>
      <Typography>A: Decrease subdivision</Typography>
      <Typography>R: Switch direction</Typography>
      <Divider />
      <Typography>Ghosts</Typography>
      <Divider />
      <Typography>Q: Pop Ghost</Typography>
      <Typography>1: Push Label Ghost</Typography>
      <Typography>2: Push Button Ghost</Typography>
      <Typography>3: Push Input Field Ghost</Typography>
    </div>
  );
};

const Segmentation = () => {
  const classes = useStyles();

  const { width } = useWindowDimensions();

  const defaultWidth = width * 0.7;
  const defaultHeight = (defaultWidth / 16) * 9;

  const onQuickSave = () => {
    TreeRenderer.dumpAst(true);
  };

  const onQuickLoad = () => {
    TreeRenderer.loadAst();
  };

  const onClear = () => {
    localStorage.clear('ast');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.mainWrapper}>
        <P5Wrapper sketch={sketch} width={defaultWidth} height={defaultHeight} />
      </div>
      <Paper className={classes.drawerWrapper}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained" color="primary" onClick={onQuickSave}>Save</Button>
          <Button variant="contained" color="primary" onClick={onQuickLoad}>Load</Button>
          <Button variant="contained" color="primary" onClick={onClear}>Clear</Button>
        </div>
        <Divider />
        <Controls />
        <Divider />
      </Paper>
    </div>
  );
};

export default Segmentation;
