import React, { Component } from "react";
import "./App.css";
import List from "../List/List";
import Search from "../Search/Search";

class App extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>To-Do List</h1>
        </div>
        <div className='main-container'>
          <Search />
          <List />
        </div>
      </div>
    );
  }
}

export default App;
