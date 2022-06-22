import React, { Component } from "react";
import "./App.css";
import List from "../List/List";

class App extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>To-Do List</h1>
        </div>
        <List />
      </div>
    );
  }
}

export default App;
