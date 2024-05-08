import { useState } from 'react';
import { Stack, Box } from '@mui/material';
import './styles.css'

function App() {

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  function endTurn() {
    alert('Button clicked.');
  }

  function changeCookieState() {
    alert('Cookie state changed.');
  }

  function Cookie() {
    return (
      <img src="cookie-normal.png" alt="cookie" className="cookie-img"/>
    )
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
        <div className="cookie-stacks">
          <div className="slot-1" onClick={changeCookieState}>
          <Stack 
            justifyContent="center"
            alignItems="flex-start"
            spacing={-23}
          >
            <Box><Cookie /></Box>
          </Stack>
          </div>

          <div className="slot-2" onClick={changeCookieState}>
          <Stack 
            justifyContent="center"
            alignItems="flex-start"
            spacing={-23}
          >
            <Box style={{ zIndex: 3 }}><Cookie /></Box>
            <Box style={{ zIndex: 2 }}><Cookie /></Box>
            <Box style={{ zIndex: 1 }}><Cookie /></Box>
          </Stack>
          </div>

          <div className="slot-3" onClick={changeCookieState}>
          <Stack 
            justifyContent="center"
            alignItems="flex-start"
            spacing={-23}
          >
            <Box style={{ zIndex: 5 }}><Cookie /></Box>
            <Box style={{ zIndex: 4 }}><Cookie /></Box>
            <Box style={{ zIndex: 3 }}><Cookie /></Box>
            <Box style={{ zIndex: 2 }}><Cookie /></Box>
            <Box style={{ zIndex: 1 }}><Cookie /></Box>
          </Stack>
          </div>

          <div className="slot-4" onClick={changeCookieState}>
          <Stack 
            justifyContent="center"
            alignItems="flex-start"
            spacing={-23}
          >
            <Box style={{ zIndex: 7 }}><Cookie /></Box>
            <Box style={{ zIndex: 6 }}><Cookie /></Box>
            <Box style={{ zIndex: 5 }}><Cookie /></Box>
            <Box style={{ zIndex: 4 }}><Cookie /></Box>
            <Box style={{ zIndex: 3 }}><Cookie /></Box>
            <Box style={{ zIndex: 2 }}><Cookie /></Box>
            <Box style={{ zIndex: 1 }}><Cookie /></Box>
          </Stack>
          </div>
        </div>

        <button className="turn-button" onClick={endTurn}>
          END TURN
        </button>

        <div className="show-button" onClick={toggleVisibility}>
        {isVisible ? 'Hide Text' : 'Show Text'}
        </div>
      {isVisible && <p> Text Shown (placeholder for best play text.) </p>}
      </div>
    </>
  )
}

export default App

// success message
console.log('App.jsx loaded')