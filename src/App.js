import React from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

const App = () => {
  const scale = 1.0;
  return (
    <div className="App">
      <P5Wrapper sketch={sketch} width={1024 * scale} height={768 * scale} />
    </div>
  );
};

export default App;
