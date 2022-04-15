import React, { Component } from "react";
import "./App.css";
import TdlistsContainer from "../TdlistsContainer/TdlistsContainer";

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="topHeading">
          <h1>To-Do List</h1>
        </div>
        <TdlistsContainer />
      </div>
    );
  }
}

export default App;