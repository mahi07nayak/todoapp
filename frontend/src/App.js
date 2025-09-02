// Import React core library
import React, { useEffect, useState } from 'react';

// Import API functions we created
import { getTodos, createTodo, updateTodo, deleteTodo } from './api';

// Import CSS file
import './styles.css';

export default function App() {
  // State: list of todos
  const [todos, setTodos] = useState([]);

  // State: text entered by user
  const [title, setTitle] = useState('');

  // State: filter type (all / active / completed)
  const [filter, setFilter] = useState('all');

  // State: dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // 📌 Load todos from backend
  const loadTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  // 📌 Run only once when component loads
  useEffect(() => { loadTodos(); }, []);

  // 📌 Add a new todo
  const addTodo = async (e) => {
    e.preventDefault(); // prevent page refresh
    if (!title.trim()) return;
    const res = await createTodo(title);
    setTodos([res.data, ...todos]); // add new todo to list
    setTitle(''); // clear input
  };

  // 📌 Toggle todo (done/undone)
  const toggleTodo = async (todo) => {
    const res = await updateTodo(todo._id, { done: !todo.done });
    setTodos(todos.map(t => t._id === res.data._id ? res.data : t));
  };

  // 📌 Delete todo
  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t._id !== id));
  };

  // 📌 Clear completed todos
  const clearCompleted = () => {
    todos.filter(t => t.done).forEach(t => deleteTodo(t._id));
    setTodos(todos.filter(t => !t.done));
  };

  // 📌 Filter todos based on selection
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  // Count of remaining tasks
  const remainingCount = todos.filter(t => !t.done).length;

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="card">
        {/* Header with title + dark mode button */}
        <div className="header">
          <h1 className="title">✅ Pro Todo App</h1>
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        {/* Form to add new task */}
        <form onSubmit={addTodo} className="add-form">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add</button>
        </form>

        {/* Todo List */}
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo._id} className={todo.done ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo)}
                />
                <span>{todo.title}</span>
              </label>
              <button className="delete-btn" onClick={() => removeTodo(todo._id)}>✖</button>
            </li>
          ))}
        </ul>

        {/* If no todos */}
        {filteredTodos.length === 0 && <p className="empty">✨ Nothing here!</p>}

        {/* Footer: remaining count, filters, clear button */}
        <div className="footer">
          <span>{remainingCount} items left</span>
          <div className="filters">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
            <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
            <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
          </div>
          <button className="clear-btn" onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
}
