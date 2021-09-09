import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Checkbox } from "../Checkbox";

export const TodosList = ({ addTodos, setAddTodos }) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;

    const updateTodos = addTodos.map((item) => ({
      ...item,
      done: item.id === name ? checked : item.done,
    }));
    setAddTodos(updateTodos);
  };

  const deleteTodo = (id) => {
    const updateTodos = addTodos.filter((item) => item.id !== id);
    setAddTodos(updateTodos);
  };

  const editTodo = (idTodo, newValue) => {
    setAddTodos((prev) =>
      prev.map((item) => (item.id === idTodo ? newValue : item))
    );
  };

  return (
    <Droppable droppableId="todos">
      {(droppableProvided) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
          className="todo-list"
        >
          {addTodos.length
            ? addTodos.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(draggableProvided) => (
                      <div
                        className="todo-container"
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                      >
                        <Checkbox
                          data={item}
                          handleChange={handleChange}
                          deleteTodo={deleteTodo}
                          editTodo={editTodo}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })
            : "No Tasks"}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
