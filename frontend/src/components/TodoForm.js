import React, { useState, useEffect } from 'react';

export default function TodoForm({ existingTodo, onSubmit, onCancel }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (existingTodo) setText(existingTodo.text);
    else setText('');
  }, [existingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter task..." />
      <button type="submit">{existingTodo ? 'Update' : 'Add'}</button>
      {existingTodo && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
