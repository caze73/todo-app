import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import withRouter from "./Routing";

class TodoEdit extends Component {

    emptyItem = {
        title: '',
        completed: false
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        console.log(this.props)
        if (this.props.match.params.id !== 'new') {
            const todo = await (await fetch(`/todos/${this.props.match.params.id}`)).json();
            this.setState({ item: todo });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/todos' + (item.id ? '/' + item.id : ''), {
            method: item.id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        //this.props.history.push('/todos');
        withRouter('/todos');
    }

    render() {
        const { item } = this.state;
        const title = <h2>{item.id ? 'Edit Todo' : 'Add Todo'}</h2>;

        return (
            <div>
                <AppNavbar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" value={item.title || ''}
                                onChange={this.handleChange} autoComplete="title" />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="completed" id="completed"
                                    checked={item.completed || false}
                                    onChange={this.handleChange} />{' '}
                                Completed
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/todos">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default withRouter(TodoEdit);