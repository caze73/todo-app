import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './TodoList';
import TodoEdit from "./TodoEdit";

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" exact={true} element={<Home />}/>
                    <Route path="/todos" exact={true} element={<TodoList />}/>
                    <Route path="/todos/:id" element={<TodoEdit />}/>
                </Routes>
            </Router>
        )
    }
}

    /**
    state = {
        todos: []
    };
    async componentDidMount() {
        const response = await fetch('/todos');
        const body = await response.json();
        this.setState({todos: body});
    }

    render() {
        const {todos} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="App-intro">
                        <h2>Todos</h2>
                        {todos.map(todo =>
                            <div key={todo.id}>
                                {todo.title} {todo.completed}
                            </div>
                        )}
                    </div>
                </header>
            </div>
        );
    }
}
**/

export default App;
