import React, { useState } from "react";
import { TodosForm } from "../TodosForm";

export const Checkbox = ({ data, handleChange, deleteTodo, editTodo }) => {
  const { id, done, value } = data;

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    editTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodosForm edit={edit} handleTodo={submitUpdate} />;
  }

  return (
    <>
      <div className={done === true ? "checked item" : "item"}>
        <input
          id="check"
          type="checkbox"
          className="check-todo"
          name={id}
          defaultChecked={done}
          onChange={handleChange}
        />
        <p className={done === true ? "checked line-through" : ""}>{value}</p>
        <div className="btn-container">
          <i
            className="far fa-edit"
            onClick={() => {
              setEdit({ id: id, value: value });
            }}
          ></i>
          <i className="fas fa-window-close" onClick={deleteTodo}></i>
        </div>
      </div>
    </>
  );
};
