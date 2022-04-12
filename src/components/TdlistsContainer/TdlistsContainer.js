import React, { Component } from "react";
import { getData } from '../../util/apiCalls';

class TdlistsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdlists: [],
    };
  }

  componentDidMount = () => {
    getData(
      'https://tdlist-api.herokuapp.com/api/version1/tdlists',
      { mode: 'no-cors' }
    )
    .then(data => this.setState({tdlists: data}))
    .then(console.log('test'))
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
                  <span className="removeItemButton">x</span>
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