const generateHelper = (ast) => {
  const name = `wrapper${ast.id}`;
  const self = `
    ${name}: {
      display: 'flex',
      flexDirection: '${ast.direction}',
      flex: ${ast.flex},
    }
  `;

  const childStringArr = ast.children.map((childAst) => generateHelper(childAst));

  return [self].concat(childStringArr);
};

const generate = (ast) => {
  const arr = generateHelper(ast);
  return `{${arr.join(',\n')}}`;
};

export default generate;
