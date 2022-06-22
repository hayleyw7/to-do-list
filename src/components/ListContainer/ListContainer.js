import React, { useState, useEffect } from "react";
import "./ListContainer.css";
import { getList, deleteTask, modifyTask } from '../../util/apiCalls';
import Search from "../Search/Search";

const ListContainer = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList()
    .then(data => setList(data))
  }, [list, setList]);

  const removeTask = (id) => {
    const filteredLists = list.filter(list => list.id !== id);
    setList(filteredLists);
    deleteTask(id);
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
      <Search />
      {displayList()}
    </div>
  );
};

export default ListContainer;
