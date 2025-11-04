import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, deleteTodo, toggleCompleted }) {
    function handleChange() {
        toggleCompleted(todo.id);
    }

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={handleChange}
            />
            <p className="todo-text">{todo.title}</p>
            <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
            >
                ×
            </button>
        </div>
    );
}

export default TodoItem;