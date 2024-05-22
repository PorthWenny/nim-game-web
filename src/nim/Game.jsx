import { useState } from "react";
import { Stack, Box } from "@mui/material";
import "../web/styles.css";

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

export default function Game() {
  const [cookies, setCookies] = useState(initCookies);
  const [selected, setSelected] = useState(null);

  function endTurn() {
    const filteredCookies = cookies.map((row, rowIndex) => {
      if (rowIndex === selected) {
        return row.filter((cookie) => !cookie.isSelected);
      }
      return row;
    });

    setCookies(filteredCookies);

    setSelected(null);
  }

  function Cookie(cookie) {
    return (
      <img
        src="cookie-normal.png"
        alt="cookie"
        className={`cookie-img ${cookie.isSelected ? "invert-selected" : ""} ${
          cookie.isSelected && selected === null ? "gone" : ""
        }`}
      />
    );
  }

  function selectCookie(index) {
    // select only on one row
    if (selected !== index && selected !== null) {
      return;
    }

    setSelected(index);
    const updatedCookies = cookies.map((row) =>
      row.map((cookie) => ({ ...cookie }))
    );
    updatedCookies[index].filter(
      (cookie) => !cookie.isSelected
    )[0].isSelected = true;
    setCookies(updatedCookies);
  }

  function unselectCookie(index) {
    const updatedCookies = cookies.map((row) =>
      row.map((cookie) => ({ ...cookie }))
    );
    const selectedCookies = updatedCookies[index].filter(
      (cookie) => cookie.isSelected
    );

    // Check if the "End Turn" button has been clicked
    if (selected === null) {
      // Reset all selected cookies
      updatedCookies.forEach((row) =>
        row.forEach((cookie) => {
          cookie.isSelected = false;
        })
      );
    } else {
      // Unselect the last selected cookie
      if (selectedCookies.length > 0) {
        const lastSelectedCookie = selectedCookies[selectedCookies.length - 1];
        lastSelectedCookie.isSelected = false;
      }
    }

    setCookies(updatedCookies);

    // no more cookies
    const hasSelectedCookies = updatedCookies.some((row) =>
      row.some((cookie) => cookie.isSelected)
    );
    if (!hasSelectedCookies) {
      setSelected(null);
    }
  }

  return (
    <>
      <div className="cookie-stacks">
        {cookies.map((cookieRow, index) => (
          <div
            onClick={() => selectCookie(index)}
            onContextMenu={(e) => {
              e.preventDefault();
              unselectCookie(index);
            }}
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
    </>
  );
}
