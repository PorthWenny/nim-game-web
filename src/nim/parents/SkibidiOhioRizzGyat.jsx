import React from "react";

const SkibidiOhioRizzGyat = ({ lastToPlay }) => {
  return (
    <div className="winner-display">
      {lastToPlay === "user" && <p>The computer wins!</p>}
      {lastToPlay === "computer" && <p>You wins!</p>}
    </div>
  );
};

export default SkibidiOhioRizzGyat;
