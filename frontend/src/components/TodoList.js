import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import './TodoList.css';

function TodoList() {

    const [tasks, setTasks] = useState([]);

    const [text, setText] = useState('');

    useEffect(() => {
        fetch("/todos")
            .then(response => response.json())
            .then(data => setTasks(data))
    }, [])

    async function addTask(text) {

        if (text.trim() === '') return;

        const newTask = {
            title: text.trim(),
            completed: false
        };

        try {
            const response = await fetch('/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask)
            });

            if (response.ok) {
                const savedTask = await response.json();
                setTasks([...tasks, savedTask]);
                setText('');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    async function deleteTask(id) {
        try {
            const response = await fetch(`/todos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setTasks(tasks.filter(task => task.id !== id));
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    async function toggleCompleted(id) {
        try {
            const taskToUpdate = tasks.find(task => task.id === id);
            if (!taskToUpdate) return;

            const updatedTask = {
                ...taskToUpdate,
                completed: !taskToUpdate.completed
            };

            const response = await fetch(`/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                const savedTask = await response.json();
                setTasks(tasks.map(task => {
                    if (task.id === id) {
                        return savedTask;
                    } else {
                        return task;
                    }
                }));
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    return (
        <div className="todo-list">
            <div className="todo-input-container">
                <input
                    className="todo-input"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="What needs to be done?"
                    onKeyPress={e => e.key === 'Enter' && addTask(text)}
                />
                <button
                    className="add-button"
                    onClick={() => addTask(text)}
                    disabled={text.trim() === ''}
                >
                    Add Task
                </button>
            </div>

            <div className="todo-items">
                {tasks.length === 0 ? (
                    <div className="empty-state">No tasks yet. Add one above!</div>
                ) : (
                    tasks.map(task => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            toggleCompleted={toggleCompleted}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TodoList;