// src/components/TodoItem.jsx
import React from 'react';

// TodoItem component receives task data and handler functions as props
const TodoItem = ({ todo, handleToggleTodo, handleDeleteTodo }) => {
    
    // Conditional inline style to strike through completed tasks
    const itemStyle = {
      textDecoration: todo.completed ? 'line-through' : 'none',
      cursor: 'pointer',
    };

    return (
        <div className="todo-item">
            {/* Task text. Click handler is attached to the span */}
            <span style={itemStyle} onClick={() => handleToggleTodo(todo.id)}>
                {todo.text}
            </span>
            
            {/* CRITICAL DIV for button grouping and Flexbox layout (Fixes button overlap/spacing) */}
            <div className="todo-actions"> 
                {/* Complete / Undo Button */}
                <button 
                  onClick={() => handleToggleTodo(todo.id)}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                
                {/* Delete Button */}
                <button 
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;