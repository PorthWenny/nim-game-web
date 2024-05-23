import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "../web/styles.css";
import { setWinner, setGameStart } from "./parents/winnerHandler";

const data = [
  { image: { uri: "roulette/user.png" } },
  { image: { uri: "roulette/computer.png" } },
];

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
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
            setTimeout(() => {
              setGameStart(true);
            }, 2000);
          }}
        />
        <button className="turn-button" onClick={handleSpinClick}>
          PLAY
        </button>
      </div>
    </>
  );
};
