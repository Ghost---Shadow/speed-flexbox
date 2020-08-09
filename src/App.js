import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Segmentation from './Segmentation';
import PostProcessing from './PostProcessing';
import CodeGeneration from './CodeGeneration';

function TabPanel(props) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
  },
  tabWrapper: {
    backgroundColor: 'ORANGE',
    color: 'WHITE',
  },
  tabPannelWrapper: {
  },
}));

const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const tabLabels = ['Segmentation', 'Post Processing', 'Code Generation'];

  const tabs = tabLabels.map((label) => (
    <Tab label={label} key={label} id={label} aria-controls={label} />
  ));

  return (
    <div className={classes.wrapper}>
      <div className={classes.tabWrapper}>
        <Tabs value={value} onChange={handleChange} aria-label="Tabs">
          {tabs}
        </Tabs>
      </div>
      <div className={classes.tabPannelWrapper}>
        <TabPanel value={value} index={0}>
          <Segmentation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PostProcessing />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CodeGeneration />
        </TabPanel>
      </div>
    </div>
  );
};

export default App;
