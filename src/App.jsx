import { useState } from 'react';
import './styles.css'

function App() {

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  function endTurn() {
    alert('Button clicked.');
  }

  return (
    <>
      <div className="header">
        <div className="title">
        NIM GAME
        </div>

        <div className="subtitle">
        a simple game <br></br> of math and strategy
        </div>
      </div>

      <div className="game-box">

        <button className="turn-button" onClick={endTurn}>
          END TURN
        </button>

        <div className="show-button" onClick={toggleVisibility}>
        {isVisible ? 'Hide Text' : 'Show Text'}
        </div>
      {isVisible && <p> i love porn yum yum. </p>}
      </div>
    </>
  )
}

export default App

// success message
console.log('App.jsx loaded')