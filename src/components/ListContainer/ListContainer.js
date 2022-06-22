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

  const removeTask = (id) => {
    const filteredLists = list.filter(list => list.id !== id);
    setList(filteredLists);
    deleteTask(id);
  };

  const createTask = event => {
    if (event.key === "Enter" && !(event.target.value === "")) {  
      let newTask = {
        id: Date(),
        title: inputValue,
        done: false
      };
       
      setList([newTask, ...list]);
      postTask(newTask);
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
    return <div className="app">
      <input
      className="search-bar"
      type="text"
      placeholder="Type Task & Press Enter"
      maxLength="15"
      onKeyPress={createTask}
      value={inputValue}
      onChange={event => handleChange(event)}
    /></div>
  };

  const displayList = () => {
    return <ul className="list">
      {list.map((task) => {
        return (
          <li className="task" task={task} key={task.id}>

            <input
              className="checkbox"
              type="checkbox"
              checked={task.done}
              onChange={(e) => modifyTask(e, task, setList)}
            />

            <label className="task-display">{task.title}</label>

            <span
              className="delete-btn"
              onClick={() => removeTask(task.id)} 
            >
              x
            </span>

          </li>
        );
      })}
    </ul>
  }

  return (
    <div className='main-container'>
      {displaySearch()}
      {displayList()}
    </div>
  );
};

export default ListContainer;
