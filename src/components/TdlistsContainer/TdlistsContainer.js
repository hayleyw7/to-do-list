import React, { useState, useEffect } from "react";
import { getLists, postList, deleteList } from '../../util/apiCalls';
import update from "immutability-helper";

function TdlistsContainer(props) {
  const [tdlists, setTdlists] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getLists()
    .then(data => setTdlists(data))
  }, [tdlists, setTdlists]);

  const removeList = (id) => {
    const filteredLists = tdlists.filter(list => list.id !== id);
    setTdlists(filteredLists);

    deleteList(id);
  };

  const createList = event => {
    if (event.key === "Enter" && !(event.target.value === "")) {  
      let newList = {
        id: Date(),
        title: inputValue,
        done: false
      };
       
      setTdlists([newList, ...tdlists]);
      postList(newList);
      clearInput();
    };
  };

  const modifyTdlist = (e, tdlist) => {
    return fetch(`https://td-list-api.herokuapp.com/api/version1/tdlists/${tdlist.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tdlist: { done: e.target.checked } })
    })
    .then((res) => {
      
      var index = tdlists.findIndex((list) => 
        list.id === res.data.id
      );

      var tdlists = update(tdlists, {
        [index]: { $set: res.data },
      });

      setTdlists(tdlists)
    });
  };

  const clearInput = () => {
    setInputValue("");
  };

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const displaySearch = () => {
    return <div className="taskContainer">
      <input
      className="newTask"
      type="text"
      placeholder="Type Task & Press Enter"
      maxLength="15"
      onKeyPress={createList}
      value={inputValue}
      onChange={event => handleChange(event)}
    /></div>
  };

  const displayLists = () => {
    return <div className="wrapItems">
      <ul className="listItems">
        {tdlists.map((tdlist) => {
          return (
            <li className="item" tdlist={tdlist} key={tdlist.id}>

              <input
                className="itemCheckbox"
                type="checkbox"
                checked={tdlist.done}
                onChange={(e) => modifyTdlist(e, tdlist)}
              />

              <label className="itemDisplay">{tdlist.title}</label>

              <span
                className="removeItemButton"
                onClick={() => removeList(tdlist.id)} 
              >
                x
              </span>

            </li>
          );
        })};
      </ul>
    </div>
  }

  return (
    <div className='tdlistsContainer'>
      {displaySearch()}
      {displayLists()}
    </div>
  );
};

export default TdlistsContainer;