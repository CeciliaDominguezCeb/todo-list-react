import React, { useState, useEffect } from "react";
import { TodosForm } from "../TodosForm";
import { TodosList } from "../TodosList";
import { DragDropContext } from "react-beautiful-dnd";

export const TodosContainer = () => {
  const [addTodos, setAddTodos] = useState([]);

  const handleTodo = (todo) => {
    const newTodos = [todo, ...addTodos];

    setAddTodos(newTodos);
    console.log(newTodos);
  };

  useEffect(() => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      setAddTodos(localTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(addTodos));
  }, [addTodos]);

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  return (
    <main className="todolist-wrapper">
      <h1 className="title">Today's task</h1>
      <TodosForm handleTodo={handleTodo} />
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
          ) {
            return;
          }
          setAddTodos((prev) => reorder(prev, source.index, destination.index));
        }}
      >
        <TodosList addTodos={addTodos} setAddTodos={setAddTodos} />
      </DragDropContext>
    </main>
  );
};
