import { useState } from "react";
import { Stack, Box } from "@mui/material";
import "./styles.css";

const initCookies = [
  [{ id: 1, isSelected: false }],
  [
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
  ],
  [
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
    { id: 4, isSelected: false },
    { id: 5, isSelected: false },
  ],
  [
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
    { id: 4, isSelected: false },
    { id: 5, isSelected: false },
    { id: 6, isSelected: false },
    { id: 7, isSelected: false },
  ],
];

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [cookies, setCookies] = useState(initCookies);
  const [selected, setSelected] = useState(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  function endTurn() {
    alert("Button clicked.");
    setSelected(null);
  }

  function changeCookieState() {
    alert("Cookie state changed.");
  }

  function Cookie(cookie) {
    return (
      <img
        src="cookie-normal.png"
        alt="cookie"
        className={`cookie-img ${cookie.isSelected ? "gone" : ""}`}
      />
    );
  }

  function selectCookie(index) {
    // select only on one row
    // if (selected !== null) {
    //   return;
    // }

    setSelected(index);
    const updatedCookies = cookies.map((row) =>
      row.map((cookie) => ({ ...cookie }))
    );
    updatedCookies[index].filter(
      (cookie) => !cookie.isSelected
    )[0].isSelected = true;
    setCookies(updatedCookies);
  }

  return (
    <>
      <div className="header">
        <div className="title">NIM GAME</div>

        <div className="subtitle">
          a simple game <br></br> of math and strategy
        </div>
      </div>

      <div className="game-box">
        <div className="cookie-stacks">
          {cookies.map((cookieRow, index) => (
            <div
              onClick={() => selectCookie(index)}
              className={`cookie-row-${index + 1}`}
              key={index}
            >
              <Stack
                justifyContent="center"
                alignItems="flex-start"
                spacing={-23}
              >
                {cookieRow.map((cookie, cookieIndex) => {
                  return (
                    <Box
                      key={cookie.id}
                      style={{ zIndex: cookieRow.length - cookieIndex }}
                    >
                      {/* {cookie.isSelected ? 1 : 0} */}
                      <Cookie {...cookie} />
                    </Box>
                  );
                })}
              </Stack>
            </div>
          ))}
        </div>

        <button className="turn-button" onClick={endTurn}>
          END TURN
        </button>

        <div className="show-button" onClick={toggleVisibility}>
          {isVisible ? "Hide Text" : "Show Text"}
        </div>
        {isVisible && <p> Text Shown (placeholder for best play text.) </p>}
      </div>
    </>
  );
}

export default App;

// success message
console.log("App.jsx loaded");
