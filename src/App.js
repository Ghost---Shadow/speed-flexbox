import React, { useState } from 'react';
import PropTypes from 'prop-types';

import queryString from 'query-string';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Segmentation from './Segmentation';
import TreeRenderer from './Segmentation/sketch/TreeRenderer';
import CodeGeneration from './CodeGeneration';

function TabPanel(props) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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
    backgroundColor: '#FF8300',
    color: 'WHITE',
  },
  tabPannelWrapper: {
  },
}));

const App = () => {
  const classes = useStyles();

  const queryTab = Number.parseInt(queryString.parse(window.location.search).tab, 10) || 0;

  const [tab, setTab] = useState(queryTab);

  const handleChange = (event, newValue) => {
    const ast = TreeRenderer.dumpAst();
    localStorage.setItem('ast', JSON.stringify(ast));
    window.history.pushState({}, '', `?tab=${newValue}`);
    setTab(newValue);
  };

  const tabLabels = ['Segmentation', 'Code Generation'];

  const tabs = tabLabels.map((label) => (
    <Tab label={label} key={label} id={label} aria-controls={label} />
  ));

  return (
    <div className={classes.wrapper}>
      <div className={classes.tabWrapper}>
        <Tabs value={tab} onChange={handleChange} aria-label="Tabs">
          {tabs}
        </Tabs>
      </div>
      <div className={classes.tabPannelWrapper}>
        <TabPanel value={tab} index={0}>
          <Segmentation />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <CodeGeneration />
        </TabPanel>
      </div>
    </div>
  );
};

export default App;
