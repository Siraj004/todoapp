import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to load todos');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await api.post('/todos', { text });
      setTodos(prev => [...prev, res.data]);
      setText('');
    } catch (err) {
      console.error('Add failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Background image style (replace URL with your image)
  const pageStyle = {
    backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/009/258/310/original/set-of-to-do-list-template-with-hand-drawn-watercolor-leaf-illustration-background-vector.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'sans-serif',
  };

  // Inner container style to limit width and center content with white translucent background
  const containerStyle = {
    maxWidth: 500,
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2>My To-Do List</h2>

        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter a task..."
            style={{ flex: 1, padding: '10px' }}
          />
          <button type="submit" style={{ padding: '10px 16px' }}>Add</button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo._id} style={{
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{todo.text}</span>
              <button
                onClick={() => handleDelete(todo._id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleLogout}
          style={{
            marginTop: '20px',
            padding: '10px 16px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
