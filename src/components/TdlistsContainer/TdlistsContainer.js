import React, { Component } from "react";

class TdlistsContainer extends Component {
  render() {
    return (
      <div>
        <div className="taskContainer">
          <input
            className="newTask"
            type="text"
            placeholder="Enter new task here (then press Enter)"
            maxLength="75"
          />
        </div>
        <div className="wrapItems">
          <ul className="listItems"></ul>
        </div>
      </div>
    );
  }
}

export default TdlistsContainer;