import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import "../web/styles.css";
import {
  getWinner,
  setWinnerUpdateCallback,
  setGameStart,
} from "./parents/winnerHandler.js";
import { isWinningMove } from "./calculations.js";
import { bestPlay } from "./mechanics.js";
import SkibidiOhioRizzGyat from "./parents/SkibidiOhioRizzGyat.jsx";

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

export default function Game({
  setBestMove,
  user,
  initialStats,
  updateUserInfo,
}) {
  const [cookies, setCookies] = useState(initCookies);
  const [selected, setSelected] = useState(null);
  const [jar, setJar] = useState(initCookies.map((row) => row.length));
  const [free, setFree] = useState(initCookies.map((row, index) => index));
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isComputerMoving, setIsComputerMoving] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    setCurrentPlayer(getWinner() === 0 ? "user" : "computer");
  }, []);

  useEffect(() => {
    setWinnerUpdateCallback((winner) => {
      setCurrentPlayer(winner === 0 ? "user" : "computer");
    });
  }, []);

  useEffect(() => {
    if (currentPlayer === "computer" && !isComputerMoving && !gameEnded) {
      setIsComputerMoving(true);
      setCurrentPlayer("computer");
      setTimeout(() => {
        computerTurn();
      }, 1000);
    }
    checkGameEnd(filteredCookies);
  }, [currentPlayer, isComputerMoving, gameEnded]);

  const handleGameEnd = (isWinner) => {
    const updatedStats = {
      ...stats,
      wins: !isWinner ? stats.wins + 1 : stats.wins,
      loses: isWinner ? stats.loses + 1 : stats.loses,
      nim_done: stats.nim_done,
      rounds_done: stats.rounds_done,
    };
    setStats(updatedStats);
    updateUserInfo(user, updatedStats);

    setCookies(initCookies);
    setSelected(null);
    setJar(initCookies.map((row) => row.length));
    setFree(initCookies.map((row, index) => index));
    setCurrentPlayer(null);
    setIsComputerMoving(false);
    setGameEnded(false);
    setGameStart(false);
  };

  useEffect(() => {
    if (gameEnded) {
      setTimeout(() => {
        handleGameEnd(currentPlayer === "user");
      }, 5000);
    }
  }, [gameEnded]);

  useEffect(() => {
    const newJar = cookies.map(
      (row) => row.filter((cookie) => !cookie.isSelected).length
    );
    setJar(newJar);
    const newFree = newJar
      .map((count, index) => (count > 0 ? index : null))
      .filter((index) => index !== null);
    setFree(newFree);

    const move = bestPlay(newJar, newFree).message;
    setBestMove(move);
  }, [cookies, setBestMove, gameEnded]);

  const filteredCookies = cookies.map((row, rowIndex) => {
    if (rowIndex === selected) {
      return row.filter((cookie) => !cookie.isSelected);
    }
    return row;
  });

  const endTurn = () => {
    const anyCookiesSelected = cookies.some((row) =>
      row.some((cookie) => cookie.isSelected)
    );

    if (anyCookiesSelected) {
      const newJar = cookies.map(
        (row) => row.filter((cookie) => !cookie.isSelected).length
      );

      const newFree = newJar
        .map((count, index) => (count > 0 ? index : null))
        .filter((index) => index !== null);

      const move = bestPlay(newJar, newFree);

      setStats((prevStats) => ({
        ...prevStats,
        rounds_done: prevStats.rounds_done + 1,
      }));

      if ((move.message = "There is no optimal play. Play anything.")) {
        setStats((prevStats) => ({
          ...prevStats,
          nim_done: prevStats.nim_done + 1,
        }));
      }

      setCookies(filteredCookies);
      setSelected(null);
      setCurrentPlayer("computer");
      checkGameEnd(filteredCookies);
    }
  };

  const checkGameEnd = (filteredCookies) => {
    const totalCookies = filteredCookies.reduce(
      (total, row) => total + row.length,
      0
    );
    if (totalCookies === 0) {
      setGameEnded(true);
    }
  };

  const computerTurn = () => {
    let moveFound = false;
    for (let i = 0; i < jar.length; i++) {
      if (jar[i] > 0) {
        for (let j = 1; j <= jar[i]; j++) {
          if (isWinningMove(jar, i, j)) {
            makeMove(i, j);
            moveFound = true;
            break;
          }
        }
        if (moveFound) break;
      }
    }
    if (!moveFound) {
      const validRows = jar
        .map((count, index) => (count > 0 ? index : null))
        .filter((index) => index !== null);
      const randomRow = validRows[Math.floor(Math.random() * validRows.length)];
      const randomCount = Math.floor(Math.random() * jar[randomRow]) + 1;
      makeMove(randomRow, randomCount);
    }
  };

  const makeMove = (rowIndex, removeCount) => {
    const newCookies = cookies.map((row, i) => {
      if (i === rowIndex) {
        return row.map((cookie, j) => ({
          ...cookie,
          isSelected: j < removeCount,
        }));
      }
      return row;
    });

    setCookies(newCookies);

    setTimeout(() => {
      const updatedCookies = newCookies.map((row, i) => {
        if (i === rowIndex) {
          return row.filter((cookie) => !cookie.isSelected);
        }
        return row;
      });
      setCookies(updatedCookies);
      setIsComputerMoving(false);
      setCurrentPlayer("user");
    }, 1000);
  };

  const Cookie = ({ cookie, rowIndex }) => {
    return (
      <img
        src="cookie-normal.png"
        alt="cookie"
        className={`cookie-img ${cookie.isSelected ? "invert-selected" : ""} ${
          cookie.isSelected && selected === null ? "gone" : ""
        }`}
        onClick={() => selectCookie(rowIndex)}
        onContextMenu={(e) => {
          e.preventDefault();
          unselectCookie(rowIndex);
        }}
      />
    );
  };

  const selectCookie = (rowIndex) => {
    if (selected !== rowIndex && selected !== null) return;
    if (isComputerMoving) return;

    setSelected(rowIndex);
    const updatedCookies = cookies.map((row, i) =>
      row.map((cookie) => ({ ...cookie }))
    );
    const firstUnselectedCookie = updatedCookies[rowIndex].find(
      (cookie) => !cookie.isSelected
    );
    if (firstUnselectedCookie) {
      firstUnselectedCookie.isSelected = true;
      setCookies(updatedCookies);
    }
  };

  const unselectCookie = (rowIndex) => {
    const updatedCookies = cookies.map((row, i) =>
      row.map((cookie) => ({ ...cookie }))
    );
    const selectedCookies = updatedCookies[rowIndex].filter(
      (cookie) => cookie.isSelected
    );

    if (selected === null) {
      updatedCookies.forEach((row) =>
        row.forEach((cookie) => {
          cookie.isSelected = false;
        })
      );
    } else {
      if (selectedCookies.length > 0) {
        const lastSelectedCookie = selectedCookies[selectedCookies.length - 1];
        lastSelectedCookie.isSelected = false;
      }
    }

    setCookies(updatedCookies);

    const hasSelectedCookies = updatedCookies.some((row) =>
      row.some((cookie) => cookie.isSelected)
    );
    if (!hasSelectedCookies) {
      setSelected(null);
    }
  };

  return (
    <>
      {gameEnded && <SkibidiOhioRizzGyat lastToPlay={currentPlayer} />}
      <div className="cookie-stacks">
        {cookies.map((cookieRow, rowIndex) => (
          <div className={`cookie-row-${rowIndex + 1}`} key={rowIndex}>
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
                    <Cookie cookie={cookie} rowIndex={rowIndex} />
                  </Box>
                );
              })}
            </Stack>
          </div>
        ))}
      </div>
      <button
        className="turn-button"
        onClick={endTurn}
        disabled={
          isComputerMoving ||
          currentPlayer !== "user" ||
          !cookies.some((row) => row.some((cookie) => cookie.isSelected))
        }
      >
        END TURN
      </button>
    </>
  );
}
