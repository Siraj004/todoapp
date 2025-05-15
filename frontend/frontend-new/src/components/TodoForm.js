import React, { useState, useEffect } from 'react';

export default function TodoForm({ existingTodo, onSubmit, onCancel }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (existingTodo) {
      setText(existingTodo.text);
    } else {
      setText('');
    }
  }, [existingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        style={{ padding: '6px', marginRight: '10px' }}
      />
      <button type="submit">
        {existingTodo ? 'Update' : 'Add'}
      </button>
      {existingTodo && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '5px' }}>
          Cancel
        </button>
      )}
    </form>
  );
}
