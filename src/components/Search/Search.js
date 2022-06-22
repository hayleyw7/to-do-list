import React, { useState, useEffect } from "react";
import "./Search.css";
import { getList, postTask } from '../../util/apiCalls';

const Search = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getList()
    .then(data => setList(data))
  }, [list, setList]);

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

  return (
    <div className="app">
      <input
      className="search-bar"
      type="text"
      placeholder="Type Task & Press Enter"
      maxLength="15"
      onKeyPress={createTask}
      value={inputValue}
      onChange={event => handleChange(event)}
    /></div>
  );
};

export default Search;
