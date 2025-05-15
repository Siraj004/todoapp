import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get('/todos');
        setTodos(res.data);
      } catch (err) {
        alert('Failed to load todos');
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    const res = await api.post('/todos', { text });
    setTodos([...todos, res.data]);
  };

  const updateTodo = async (id, updatedFields) => {
    const res = await api.put(`/todos/${id}`, updatedFields);
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Your To-Dos</h2>
      <button onClick={handleLogout}>Logout</button>
      <TodoForm
        existingTodo={editing}
        onSubmit={(text) => {
          if (editing) {
            updateTodo(editing._id, { text });
            setEditing(null);
          } else {
            addTodo(text);
          }
        }}
        onCancel={() => setEditing(null)}
      />
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onEdit={() => setEditing(todo)}
          onDelete={() => deleteTodo(todo._id)}
          onToggle={() => updateTodo(todo._id, { completed: !todo.completed })}
        />
      ))}
    </div>
  );
}
