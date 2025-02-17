import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    const response = await axios.post('http://localhost:5000/todos', { title: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(todo => todo._id === id);
    const response = await axios.patch(`http://localhost:5000/todos/${id}`, { completed: !todo.completed });
    setTodos(todos.map(todo => todo._id === id ? response.data : todo));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} onClick={() => toggleComplete(todo._id)}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;