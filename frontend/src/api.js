// Import axios to make HTTP requests
import axios from 'axios';

// Base URL of backend API
// const API_URL = 'http://localhost:5000/api/todos';// this is for normal test

const API_URL ='http://backend:5000/api/todos';


// 📌 Get all todos
export const getTodos = () => axios.get(API_URL);

// 📌 Create a new todo
export const createTodo = (title) => axios.post(API_URL, { title });

// 📌 Update an existing todo
export const updateTodo = (id, data) => axios.put(`${API_URL}/${id}`, data);

// 📌 Delete a todo
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
