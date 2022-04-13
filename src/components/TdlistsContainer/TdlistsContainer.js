import React, { Component } from "react";
import { getLists } from '../../util/apiCalls';

class TdlistsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdlists: [],
    };
  }

  componentDidMount = () => {
    getLists()
    .then(data => this.setState({tdlists: data}))
  }

  deleteList = (id) => {
    const filteredLists = this.state.tdlists.filter(list => list.id !== id);
    this.setState({ tdlists: filteredLists });
  }

  render() {
    return (
      <div>
        <div className="taskContainer">
          <input
            className="newTask"
            type="text"
            placeholder="Input a New Task and Press Enter"
            maxLength="75"
            onKeyPress={this.createTodo}
          />
        </div>
        <div className="wrapItems">
          <ul className="listItems">
            {this.state.tdlists.map((tdlist) => {
              return (
                <li className="item" tdlist={tdlist} key={tdlist.id}>
                  <input className="itemCheckbox" type="checkbox" />
                  <label className="itemDisplay">{tdlist.title}</label>

                  <span
                    className="removeItemButton"
                    onClick={() => this.deleteList(tdlist.id)} 
                  >
                    x
                  </span>

                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TdlistsContainer;