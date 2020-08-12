const generate = (ast) => {
  const code = JSON.stringify(ast, null, 2);
  return {
    language: 'json',
    files: { 'ast.json': code },
  };
};

export default generate;
