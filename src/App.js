import React from 'react'
import './App.css';
import Game from './components/game/game'


// Main Screen 
function App() {
  // Game component
  return (
    <div>
      <h2 className = "instructions">Press you first or computer first before starting the game.</h2>
      <Game /> 
    </div>
      
  );
}

export default App;
