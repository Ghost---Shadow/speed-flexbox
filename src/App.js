import React from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

const App = () => {
  console.log();
  return (
    <div className="App">
      <P5Wrapper sketch={sketch} width={1024 * 1.5} height={768 * 1.5} />
    </div>
  );
};

export default App;
