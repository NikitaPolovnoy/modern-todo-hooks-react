// src/App.jsx
import React, { useState, useCallback } from 'react';
import TodoForm from './components/TodoForm'; 
import TodoList from './components/TodoList'; 
import './App.css'; 

// Initial state for the To-Do list
const initialTodos = [
  { id: 1, text: "Refactor structure using TodoForm/TodoList/TodoItem", completed: true },
  { id: 2, text: "Implement filtering and conditional rendering", completed: false },
  { id: 3, text: "Finalize CSS styling", completed: false }
];

// Helper function for clean filter button styling logic
const getFilterButtonStyle = (currentFilter, buttonValue) => ({
    fontWeight: currentFilter === buttonValue ? 'bold' : 'normal',
});

function App() {
  // State 1: Main list of tasks
  const [todos, setTodos] = useState(initialTodos);
  // State 2: Input field text
  const [inputValue, setInputValue] = useState('');
  // State 3: Current filter ('all', 'active', 'completed')
  const [filter, setFilter] = useState('all'); 
  
  // --- Handler Functions (Demonstrating Immutability & Optimization) ---
  
  // Uses useCallback to memoize the function (Performance Optimization)
  const handleAddTodo = useCallback(() => {
    if (inputValue.trim() === '') return;
    const newTodo = { id: Date.now(), text: inputValue.trim(), completed: false };
    // Functional state update: ensures we use the latest 'todos' state
    setTodos((currentTodos) => [...currentTodos, newTodo]); 
    setInputValue('');
  }, [inputValue]); // Dependency: inputValue is used inside the handler
  
  // Uses useCallback
  const handleDeleteTodo = useCallback((id) => {
    // Immutability: uses .filter() to create a NEW array
    setTodos((currentTodos) => currentTodos.filter(todo => todo.id !== id)); 
  }, []); // Dependencies: None needed (setTodos is stable)

  // Uses useCallback
  const handleToggleTodo = useCallback((id) => {
    // Immutability: uses .map() to create a NEW array and new object
    setTodos((currentTodos) => currentTodos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []); // Dependencies: None needed (setTodos is stable)

  // --- Conditional Rendering: Filtering Logic ---
  
  // Calculates the list to be displayed based on the current filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }
    if (filter === 'completed') {
      return todo.completed;
    }
    // If filter === 'all'
    return true; 
  });


  return (
    <div className="app-container">
      <h1>Modern Todo Hooks</h1>

      {/* Renders the form, passing state setters and handler */}
      <TodoForm 
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddTodo={handleAddTodo} // Memoized handler function
      />
      
      {/* Filter Buttons (Controls the 'filter' state) */}
      <div className="filter-buttons">
        <button 
          onClick={() => setFilter('all')} 
          style={getFilterButtonStyle(filter, 'all')} // Clean styling logic
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          style={getFilterButtonStyle(filter, 'active')} // Clean styling logic
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          style={getFilterButtonStyle(filter, 'completed')} // Clean styling logic
        >
          Completed
        </button>
      </div>
      
      {/* Renders the list, passing the filtered data and handlers */}
      <TodoList 
        todos={filteredTodos} 
        handleToggleTodo={handleToggleTodo} // Memoized handler function
        handleDeleteTodo={handleDeleteTodo} // Memoized handler function
      />
      
    </div>
  );
}

export default App;