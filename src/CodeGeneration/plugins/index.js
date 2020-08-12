import ReactMui from './react-mui';
import Ast from './ast';

const REACT_MUI = 'REACT_MUI';
const AST = 'AST';

export const availablePlugins = [
  { value: REACT_MUI, label: 'React + MaterialUI JSS' },
  { value: AST, label: 'AST' },
];

export const plugins = {
  REACT_MUI: ReactMui,
  AST: Ast,
};
