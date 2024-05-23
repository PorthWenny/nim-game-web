import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch {
    // Ignore write errors
  }
};

const initialState = loadState();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App initialState={initialState} saveState={saveState} />
  </React.StrictMode>
);
