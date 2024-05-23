import React from "react";

const SkibidiOhioRizzGyat = ({ lastToPlay }) => {
  return (
    <div className="winner-display">
      {lastToPlay === "user" && <p>The computer won!</p>}
      {lastToPlay === "computer" && <p>You beat the computer!</p>}
    </div>
  );
};

export default SkibidiOhioRizzGyat;
