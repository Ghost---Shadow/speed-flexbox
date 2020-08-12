import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SyntaxHighlighter from 'react-syntax-highlighter';
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { availablePlugins, plugins } from './plugins';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
  },
  mainWrapper: {
    flex: 7,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  syntaxHighlighter: {
    width: '100%',
  },
  drawerWrapper: {
    flex: 2,
    maxWidth: '300px',
    padding: '1%',
  },
  fileSelector: {

  },
  formControl: {
    display: 'flex',
  },
}));

const FileSelector = ({ fileNames, currentFileIndex, setCurrentFileIndex }) => {
  const classes = useStyles();
  const tabs = fileNames.map((fileName) => (
    <Tab key={fileName} label={fileName} />
  ));
  return (
    <Tabs
      orientation="vertical"
      value={currentFileIndex}
      onChange={(_, v) => setCurrentFileIndex(v)}
      className={classes.fileSelector}
    >
      {tabs}
    </Tabs>
  );
};

FileSelector.propTypes = {
  fileNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentFileIndex: PropTypes.number.isRequired,
  setCurrentFileIndex: PropTypes.func.isRequired,
};

const PluginSelector = ({ pluginOptions, pluginType, setPluginType }) => {
  const classes = useStyles();

  const menuItems = pluginOptions.map((pluginOption) => (
    <MenuItem key={pluginOption.value} value={pluginOption.value}>{pluginOption.label}</MenuItem>
  ));

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="plugin-selector">Select Plugin</InputLabel>
      <Select
        labelId="plugin-selector"
        id="plugin-selector"
        value={pluginType}
        onChange={(e) => setPluginType(e.target.value)}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

PluginSelector.propTypes = {
  pluginOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  pluginType: PropTypes.string.isRequired,
  setPluginType: PropTypes.func.isRequired,
};

const CodeGeneration = () => {
  const classes = useStyles();

  const ast = JSON.parse(localStorage.getItem('ast') || '{"message":"No ast found"}');

  const [pluginType, setPluginType] = useState(availablePlugins[0].value);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const plugin = plugins[pluginType];
  const generation = plugin(ast);
  const fileNames = Object.keys(generation.files);
  const code = generation.files[fileNames[currentFileIndex]] || '';

  useEffect(() => {
    setCurrentFileIndex(0);
  }, [pluginType]);

  const onDownload = () => null;

  return (
    <div className={classes.wrapper}>
      <div className={classes.mainWrapper}>
        <SyntaxHighlighter
          showLineNumbers
          language={generation.language}
          style={a11yDark}
          className={classes.syntaxHighlighter}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <Paper className={classes.drawerWrapper}>
        <Button style={{ width: '100%' }} variant="outlined" color="primary" onClick={onDownload}>
          Download ZIP
        </Button>
        <PluginSelector
          pluginOptions={availablePlugins}
          pluginType={pluginType}
          setPluginType={setPluginType}
        />
        <FileSelector
          fileNames={fileNames}
          currentFileIndex={currentFileIndex}
          setCurrentFileIndex={setCurrentFileIndex}
        />
        <Divider />
      </Paper>
    </div>
  );
};

export default CodeGeneration;
