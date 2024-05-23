import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "../web/styles.css";
import { setWinner } from "./winnerHandler";

const data = [
  { image: { uri: "roulette/user.png" } },
  { image: { uri: "roulette/computer.png" } },
];

export function sendWinner(win) {
  if (win == 0) {
    console.log("User win.");
  } else {
    console.log("Computer win.");
  }
}

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setIsVisible(false);
  };

  return (
    <>
      <div className="spin-box">
        <Wheel
          spinDuration={0.2}
          outerBorderColor="#a87b32"
          radiusLineColor="#006889"
          backgroundColors={["#effbff", "#006889"]}
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            setWinner(prizeNumber);
          }}
        />
        <button className="turn-button" onClick={handleSpinClick}>
          PLAY
        </button>
      </div>
    </>
  );
};
