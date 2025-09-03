import React, {Component} from "react";
import {Button, Container, Table} from "reactstrap";
import AppNavbar from "./AppNavbar";
import {Link} from "react-router-dom";

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch("/todos")
            .then(response => response.json())
            .then(data => this.setState({todos: data}));
    }

    async remove(id) {
        await fetch(`/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTodos = [...this.state.todos].filter(i => i.id !== id);
            this.setState({todos: updatedTodos});
        });
    }

    render() {
        const {todos, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const todoList = todos.map(todo => {
            return <tr key={todo.id}>
                <td style={{whiteSpace: 'nowrap'}}>{todo.title}</td>
                <td>{todo.completed.toString()}</td>
                <td>
                    <Link to={"/todos/" + todo.id}>Edit</Link>
                    {' '}
                    <button onClick={() => this.remove(todo.id)}>Delete</button>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/todos/new">Add Todo</Button>
                    </div>
                    <h3>Todos</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="40%">Title</th>
                            <th width="20%">Completed</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todoList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default TodoList;