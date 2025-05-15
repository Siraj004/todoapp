import React from 'react';

export default function TodoItem({ todo, onEdit, onDelete, onToggle }) {
  return (
    <div className="todo-item" style={{ marginBottom: '10px' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        style={{ marginRight: '10px' }}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          marginRight: '10px',
        }}
      >
        {todo.text}
      </span>
      <button onClick={onEdit} style={{ marginRight: '5px' }}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
