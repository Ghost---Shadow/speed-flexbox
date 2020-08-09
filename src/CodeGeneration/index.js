import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
  },
  mainWrapper: {
    flex: 7,
    display: 'flex',
    justifyContent: 'center',
  },
  syntaxHighlighter: {
    width: '100%',
  },
  drawerWrapper: {
    flex: 2,
    maxWidth: '300px',
  },
  fileSelector: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
  },
}));

const FileSelector = () => {
  const classes = useStyles();
  return (
    <div className={classes.fileSelector}>
      <Typography>File1.js</Typography>
      <Typography>File2.js</Typography>
    </div>
  );
};

const CodeGeneration = () => {
  const classes = useStyles();

  const ast = JSON.parse(localStorage.getItem('ast') || '{"message":"No ast found"}');

  const codeString = JSON.stringify(ast, null, 2);

  return (
    <div className={classes.wrapper}>
      <div className={classes.mainWrapper}>
        <SyntaxHighlighter showLineNumbers language="json" style={a11yDark} className={classes.syntaxHighlighter}>
          {codeString}
        </SyntaxHighlighter>
      </div>
      <Paper className={classes.drawerWrapper}>
        <FileSelector />
        <Divider />
      </Paper>
    </div>
  );
};

export default CodeGeneration;
