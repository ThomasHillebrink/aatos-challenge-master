import React from "react";
import "./App.css";
import Weather from "./Weather";

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Weather />
      </header>
    </div>
  );
};
