import React, { useState, useEffect, useRef } from "react";

export const TodosForm = ({ handleTodo, edit }) => {
  const [newTodo, setNewTodo] = useState(edit ? edit.value : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    handleTodo({
      done: false,
      id: (+new Date()).toString(),
      value: newTodo,
    });
    setNewTodo("");
    console.log(newTodo);
  };
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <form className="todos-form" onSubmit={handleSubmit}>
      <div className="todos-container">
        <div className="todos-input">
          <input
            placeholder={edit ? " edit your task" : " write something..."}
            className="input-text"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            ref={inputRef}
          />
          <button className="add-btn" disabled={newTodo ? "" : "disabled"}>
            {edit ? "Update" : " Add"}
          </button>
        </div>
      </div>
    </form>
  );
};
