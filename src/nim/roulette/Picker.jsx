import React, { useState, useEffect } from "react";
import $ from "jquery"; // Import jQuery

function Picker() {
  const [option, setOption] = useState({
    speed: 10,
    duration: 3,
    stopImageNumber: 0,
  });

  useEffect(() => {
    // Initialize roulette when component mounts
    $(".roulette").roulette(option);
  }, [option]);

  const handleGoClick = () => {
    const count = $(".roulette").children().length;
    const stopImageNumber = Math.floor(Math.random() * count);
    setOption({ ...option, stopImageNumber });
  };

  return (
    <>
      <h2>
        Config: <span id="config"></span>
      </h2>
      <div className="roulette" style={{ display: "none" }}>
        <img src="roulette/computer.png" alt="Computer" />
        <img src="roulette/user.png" alt="You" />
      </div>
      <button className="go" onClick={handleGoClick}>
        Go
      </button>
    </>
  );
}

export default Picker;
