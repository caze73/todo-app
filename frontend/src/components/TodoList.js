import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import './TodoList.css';

function TodoList() {

    const [todos, setTodos] = useState([]);

    const [text, setText] = useState('');

    useEffect(() => {
        fetch("/todos")
            .then(response => response.json())
            .then(data => setTodos(data))
    }, [])

    async function addTodo(text) {

        if (text.trim() === '') return;

        const newTodo = {
            title: text.trim(),
            completed: false
        };

        try {
            const response = await fetch('/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo)
            });

            if (response.ok) {
                const savedTodo = await response.json();
                setTodos([...todos, savedTodo]);
                setText('');
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async function deleteTodo(id) {
        try {
            const response = await fetch(`/todos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setTodos(todos.filter(todo => todo.id !== id));
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    async function toggleCompleted(id) {
        try {
            const todoToUpdate = todos.find(todo => todo.id === id);
            if (!todoToUpdate) return;

            const updatedTodo = {
                ...todoToUpdate,
                completed: !todoToUpdate.completed
            };

            const response = await fetch(`/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo)
            });

            if (response.ok) {
                const savedTodo = await response.json();
                setTodos(todos.map(todo => {
                    if (todo.id === id) {
                        return savedTodo;
                    } else {
                        return todo;
                    }
                }));
            }
        } catch (error) {
            console.error('Error updating todo:', error);
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
                    onKeyPress={e => e.key === 'Enter' && addTodo(text)}
                />
                <button
                    className="add-button"
                    onClick={() => addTodo(text)}
                    disabled={text.trim() === ''}
                >
                    Add Todo
                </button>
            </div>

            <div className="todo-items">
                {todos.length === 0 ? (
                    <div className="empty-state">No todos yet. Add one above!</div>
                ) : (
                    todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            deleteTodo={deleteTodo}
                            toggleCompleted={toggleCompleted}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TodoList;