import React, { useState, useEffect } from "react";
import "./ListContainer.css";
import { getList, postTask, deleteTask, modifyTask } from '../../util/apiCalls';

const ListContainer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getList()
    .then(data => setList(data))
  }, [list, setList]);

  const removeList = (id) => {
    const filteredLists = list.filter(list => list.id !== id);
    setList(filteredLists);
    deleteTask(id);
  };

  const createList = event => {
    if (event.key === "Enter" && !(event.target.value === "")) {  
      let newList = {
        id: Date(),
        title: inputValue,
        done: false
      };
       
      setList([newList, ...list]);
      postTask(newList);
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
        {list.map((tdlist) => {
          return (
            <li className="item" tdlist={tdlist} key={tdlist.id}>

              <input
                className="itemCheckbox"
                type="checkbox"
                checked={tdlist.done}
                onChange={(e) => modifyTask(e, tdlist, setList)}
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
    <div className='ListContainer'>
      {displaySearch()}
      {displayLists()}
    </div>
  );
};

export default ListContainer;
