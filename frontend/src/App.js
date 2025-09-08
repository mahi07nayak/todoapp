// Import React and required hooks
import React, { useEffect, useState } from 'react';

// Import functions to interact with the backend API
import { getTodos, createTodo, updateTodo, deleteTodo } from './api';

// Import CSS for styling
import './styles.css';

// Main App component
export default function App() {
  // 🔵 React State Hooks

  // todos: an array of todo items
  const [todos, setTodos] = useState([]);

  // title: the input text for adding a new todo
  const [title, setTitle] = useState('');

  // filter: current filter type (all / active / completed)
  const [filter, setFilter] = useState('all');

  // darkMode: boolean toggle for light/dark mode
  const [darkMode, setDarkMode] = useState(false);

  // 🔵 Load todos from backend API when app starts
  const loadTodos = async () => {
    const res = await getTodos();      // Call backend API to get all todos
    setTodos(res.data);                // Update todos state with received data
  };

  // 🔵 useEffect to load todos only once when component mounts
  useEffect(() => {
    loadTodos();                       // Fetch initial todo list from API
  }, []);                              // Empty dependency array = run once on mount

  // 🔵 Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();                // Prevent page reload on form submit
    if (!title.trim()) return;        // Do nothing if input is empty or whitespace

    const res = await createTodo(title);          // Send new todo to backend
    setTodos([res.data, ...todos]);              // Prepend new todo to existing list
    setTitle('');                                 // Clear the input field
  };

  // 🔵 Toggle a todo's completion status
  const toggleTodo = async (todo) => {
    const res = await updateTodo(todo._id, { done: !todo.done });  // Toggle 'done' on backend
    setTodos(
      todos.map(t => t._id === res.data._id ? res.data : t)        // Update local state with new todo
    );
  };

  // 🔵 Delete a todo
  const removeTodo = async (id) => {
    await deleteTodo(id);                                     // Delete todo from backend
    setTodos(todos.filter(t => t._id !== id));                // Remove todo from local state
  };

  // 🔵 Clear all completed todos
  const clearCompleted = () => {
    todos
      .filter(t => t.done)                                    // Get completed todos only
      .forEach(t => deleteTodo(t._id));                       // Delete each from backend

    setTodos(todos.filter(t => !t.done));                     // Keep only uncompleted todos in local state
  };

  // 🔵 Filter todos based on current filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;               // Show only active todos
    if (filter === 'completed') return todo.done;             // Show only completed todos
    return true;                                              // Show all todos if filter is 'all'
  });

  // 🔵 Count of remaining (active) todos
  const remainingCount = todos.filter(t => !t.done).length;

  // 🔵 Return JSX layout
  return (
    // Root container with optional dark mode class
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      
      {/* Main card wrapper */}
      <div className="card">

        {/* Header with app title and dark mode toggle */}
        <div className="header">
          <h1 className="title">✅ Pro Todo App</h1>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}    // Toggle dark mode on click
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}       // Display icon based on mode
          </button>
        </div>

        {/* Form to add new todo */}
        <form onSubmit={addTodo} className="add-form">
          <input
            value={title}                                // Bind input value to title state
            onChange={e => setTitle(e.target.value)}     // Update title state on input change
            placeholder="Add a new task..."              // Placeholder text
          />
          <button type="submit">Add</button>             // Submit button to trigger addTodo()
        </form>

        {/* Todo list rendering */}
        <ul className="todo-list">
          {filteredTodos.map(todo => (                   // Loop through filtered todos
            <li key={todo._id} className={todo.done ? 'done' : ''}>  // Style based on 'done' status
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}                     // Checkbox reflects 'done' status
                  onChange={() => toggleTodo(todo)}       // Toggle todo on change
                />
                <span>{todo.title}</span>                 // Display todo title
              </label>
              <button
                className="delete-btn"
                onClick={() => removeTodo(todo._id)}      // Delete todo on click
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        {/* Message when no todos in list */}
        {filteredTodos.length === 0 && (
          <p className="empty">✨ Nothing here!</p>        // Show when list is empty
        )}

        {/* Footer with filters and task counter */}
        <div className="footer">
          <span>{remainingCount} items left</span>        // Show count of active todos

          {/* Filter buttons */}
          <div className="filters">
            <button
              className={filter === 'all' ? 'active' : ''}  // Highlight if active filter is 'all'
              onClick={() => setFilter('all')}              // Set filter to 'all'
            >
              All
            </button>
            <button
              className={filter === 'active' ? 'active' : ''} // Highlight if active filter is 'active'
              onClick={() => setFilter('active')}            // Set filter to 'active'
            >
              Active
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''} // Highlight if filter is 'completed'
              onClick={() => setFilter('completed')}            // Set filter to 'completed'
            >
              Completed
            </button>
          </div>

          {/* Clear completed todos button */}
          <button
            className="clear-btn"
            onClick={clearCompleted}                         // Clear all completed todos
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}




// // Import React core library
// import React, { useEffect, useState } from 'react';

// // Import API functions we created
// import { getTodos, createTodo, updateTodo, deleteTodo } from './api';

// // Import CSS file
// import './styles.css';

// export default function App() {
//     // State: list of todos
//     const [todos, setTodos] = useState([]);
  
//     // State: text entered by user
//     const [title, setTitle] = useState('');
  
//     // State: filter type (all / active / completed)
//     const [filter, setFilter] = useState('all');
  
//     // State: dark mode toggle
//     const [darkMode, setDarkMode] = useState(false);
  
//     // 📌 Load todos from backend
//     const loadTodos = async () => {
//     const res = await getTodos();
//     setTodos(res.data);
//   };

//   // 📌 Run only once when component loads
//   useEffect(() => { loadTodos(); }, []);

//   // 📌 Add a new todo
//   const addTodo = async (e) => {
//     e.preventDefault(); // prevent page refresh
//     if (!title.trim()) return;
//     const res = await createTodo(title);
//     setTodos([res.data, ...todos]); // add new todo to list
//     setTitle(''); // clear input
//   };

//   // 📌 Toggle todo (done/undone)
//   const toggleTodo = async (todo) => {
//     const res = await updateTodo(todo._id, { done: !todo.done });
//     setTodos(todos.map(t => t._id === res.data._id ? res.data : t));
//   };

//   // 📌 Delete todo
//   const removeTodo = async (id) => {
//       await deleteTodo(id);
//       setTodos(todos.filter(t => t._id !== id));
//     };
  
//   // 📌 Clear completed todos
//   const clearCompleted = () => {
//       todos.filter(t => t.done).forEach(t => deleteTodo(t._id));
//       setTodos(todos.filter(t => !t.done));
//     };
  
//     // 📌 Filter todos based on selection
//     const filteredTodos = todos.filter(todo => {
//     if (filter === 'active') return !todo.done;
//     if (filter === 'completed') return todo.done;
//     return true;
//   });

//   // Count of remaining tasks
//   const remainingCount = todos.filter(t => !t.done).length;

//   return (
//       <div className={`app-container ${darkMode ? 'dark' : ''}`}>
//         <div className="card">
//           {/* Header with title + dark mode button */}
//           <div className="header">
//             <h1 className="title">✅ Pro Todo App</h1>
//             <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
//               {darkMode ? '🌙 Dark' : '☀️ Light'}
//             </button>
//           </div>
  
//           {/* Form to add new task */}
//           <form onSubmit={addTodo} className="add-form">
//             <input
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//               placeholder="Add a new task..."
//             />
//             <button type="submit">Add</button>
//           </form>

//           {/* Todo List */}
//           <ul className="todo-list">
//             {filteredTodos.map(todo => (
//             <li key={todo._id} className={todo.done ? 'done' : ''}>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={todo.done}
//                   onChange={() => toggleTodo(todo)}
//                 />
//                 <span>{todo.title}</span>
//               </label>
//               <button className="delete-btn" onClick={() => removeTodo(todo._id)}>✖</button>
//             </li>
//           ))}
//         </ul>

//         {/* If no todos */}
//         {filteredTodos.length === 0 && <p className="empty">✨ Nothing here!</p>}

//         {/* Footer: remaining count, filters, clear button */}
//         <div className="footer">
//           <span>{remainingCount} items left</span>
//           <div className="filters">
//             <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
//             <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
//             <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
//           </div>
//           <button className="clear-btn" onClick={clearCompleted}>Clear Completed</button>
//         </div>
//       </div>
//     </div>
//   );
// }

