// src/components/TodoList.jsx

import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleToggleTodo, handleDeleteTodo }) => {
  
  if (todos.length === 0) {
    return <p>No tasks found for this filter.</p>;
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id} 
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;