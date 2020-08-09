import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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

const sampleCode = `
{
  "direction": "row",
  "flex": 1,
  "children":[
    {
      "flex": 8,
      "direction": "column".
      "children":[]
    }.
    {
      "flex": 2,
      "direction": "column".
      "children":[]
    }
  ]
}
`;

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

  const codeString = sampleCode;

  return (
    <div className={classes.wrapper}>
      <div className={classes.mainWrapper}>
        <SyntaxHighlighter showLineNumbers language="json" style={docco} className={classes.syntaxHighlighter}>
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
