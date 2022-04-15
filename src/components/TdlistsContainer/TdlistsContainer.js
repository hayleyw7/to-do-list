import React, { Component } from "react";
import { getLists, postList, deleteList } from '../../util/apiCalls';

class TdlistsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdlists: [],
      inputValue: ""
    };
  };

  componentDidMount = () => {
    getLists()
    .then(data => this.setState({tdlists: data}))
  };

  removeList = (id) => {
    const filteredLists = this.state.tdlists.filter(list => list.id !== id);
    this.setState({ tdlists: filteredLists });

    deleteList(id);
  };

  createList = event => {
    if (event.key === "Enter" && !(event.target.value === "")) {  
      let newList = {
        id: this.state.tdlists.length + 1,
        title: this.state.inputValue,
        done: false,
        created_at: Date(),
        updated_at: Date()
      };
       
      this.setState({
        tdlists: [...this.state.tdlists, newList]
      });

      postList(newList);
    }
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="taskContainer">
          <input
            className="newTask"
            type="text"
            placeholder="Input a New Task and Press Enter"
            maxLength="75"
            onKeyPress={this.createList}
            value={this.state.inputValue}
            onChange={event => this.handleChange(event)}
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
                    onClick={() => this.removeList(tdlist.id)} 
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
  };
};

export default TdlistsContainer;