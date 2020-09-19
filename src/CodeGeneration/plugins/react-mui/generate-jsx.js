import generateJss from './generate-jss';
import generateDom from './generate-dom';
import generateProps from './generate-props';

const generate = (ast) => {
  const jss = generateJss(ast);
  const dom = generateDom(ast);
  const props = generateProps(ast);

  const code = `
  import React from 'react';
  // import PropTypes from 'prop-types';

  import makeStyles from '@material-ui/core/styles/makeStyles';

  import './debug.css'; // For debugging

  const useStyles = makeStyles(${jss});

  const MyComponent = (${props}) => {
    const classes = useStyles(${props});
    return (
      ${dom}
    )
  }

  MyComponent.propTypes = {
    // TODO
  }

  export default MyComponent;
  `;
  return code;
};

export default generate;
