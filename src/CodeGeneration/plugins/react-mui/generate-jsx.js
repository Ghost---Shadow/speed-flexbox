import generateJss from './generate-jss';
import generateDom from './generate-dom';

const generate = (ast) => {
  const jss = generateJss(ast);
  const dom = generateDom(ast);
  const code = `
  import React from 'react';
  import PropTypes from 'prop-types';

  import makeStyles from '@material-ui/core/styles/makeStyles';

  const useStyles = makeStyles(${jss});

  const MyComponent = (props) => {
    const classes = useStyles(props);
    return (
      ${dom}
    )
  }
  `;
  return code;
};

export default generate;
