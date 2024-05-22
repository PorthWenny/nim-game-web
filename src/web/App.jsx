import { useState } from "react";
import Game from "../nim/Game.jsx";
import { bestPlay } from "../nim/mechanics.js";
import "./styles.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="header">
        <div className="title">NIM GAME</div>

        <div className="subtitle">
          a simple game <br></br> of math and strategy
        </div>
      </div>

      <div className="game-box">
        <Game />
        <div className="show-button" onClick={toggleVisibility}>
          {isVisible ? "Hide Text" : "Show Text"}
        </div>
        {isVisible && <p> {bestPlay} </p>}
      </div>
    </>
  );
}

export default App;

// success message
console.log("App.jsx loaded");
