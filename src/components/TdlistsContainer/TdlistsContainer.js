import React, { useState, useEffect } from "react";
import { getLists, postList, deleteList, modifyTdlist } from '../../util/apiCalls';

const TdlistsContainer = () => {
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
                onChange={(e) => modifyTdlist(e, tdlist, setTdlists)}
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
