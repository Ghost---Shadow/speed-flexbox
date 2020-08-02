import React from 'react';
import './App.css';
import Canvas from './Canvas';

const App = () => {
  const draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  };
  return (
    <div className="App">
      <Canvas draw={draw} />
    </div>
  );
};

export default App;
