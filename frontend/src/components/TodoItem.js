import React from 'react';

export default function TodoItem({ todo, onEdit, onDelete, onToggle }) {
  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', margin: '0 10px' }}>
        {todo.text}
      </span>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
