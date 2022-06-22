import React, { Component } from "react";
import "./App.css";
import ListContainer from "../ListContainer/ListContainer";

class App extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>To-Do List</h1>
        </div>
        <ListContainer />
      </div>
    );
  }
}

export default App;
