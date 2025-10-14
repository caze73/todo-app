import React from 'react';
import './TodoItem.css';

function TodoItem({ task, deleteTask, toggleCompleted }) {
    function handleChange() {
        toggleCompleted(task.id);
    }

    return (
        <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={task.completed}
                onChange={handleChange}
            />
            <p className="todo-text">{task.title}</p>
            <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
            >
                ×
            </button>
        </div>
    );
}

export default TodoItem;