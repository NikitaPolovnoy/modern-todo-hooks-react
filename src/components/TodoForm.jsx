// src/components/TodoForm.jsx

import React from 'react';

const TodoForm = ({ inputValue, setInputValue, handleAddTodo }) => {
  const handleSubmission = (e) => {
    if (e.key && e.key !== 'Enter') {
      return;
    }
    handleAddTodo();
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleSubmission}
      />
      <button onClick={handleSubmission}>
        Add Task
      </button>
    </div>
  );
};

export default TodoForm;