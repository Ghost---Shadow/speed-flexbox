import { generateClassName } from './utils';

const generate = (ast) => {
  const childStringArr = ast.children.length === 0 ? ['&nbsp'] : ast.children.map(generate);

  const className = generateClassName(ast);

  const code = `
  <div className={classes.${className}}>
    ${childStringArr.join('')}
  </div>
  `;
  return code;
};

export default generate;
