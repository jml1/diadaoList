import React, { Component } from "react";
import { connect } from "react-redux";
import { registerTask } from "../../actions/taskActions";
import { Form, Button, Radio } from 'semantic-ui-react';
import Router from "next/router";

class AddForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            status: "à faire",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    // Handle form inputs change 
    onChange(e) {
        debugger;
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
    }

    onSubmit(e) {
        e.preventDefault();

        const newTask = {
            title: this.state.title,
            description: this.state.description,
            status: this.state.status,
        };

        this.props.registerTask(newTask);
        if (!this.state.errors.length > 0) {
            this.setState({
                title: "",
                description: "",
                status: "à faire",
                errors: {}
            });
        }
    }

    render() {
        return (
            <div className={"addForm"}>
                <Form>
                    <Form.Input
                        fluid
                        label='Titre*'
                        placeholder='Titre'
                        name='title'
                        value={this.state.title}
                        onChange={this.onChange}
                    />
                    <Form.TextArea
                        fluid
                        label='Description*'
                        placeholder='Description'
                        name='description'
                        value={this.state.description}
                        onChange={this.onChange}
                    />

                    <Form.Group inline>
                        <label>Statut: </label>
                        <Form.Field
                            label='à faire'
                            control='input'
                            type='radio'
                            name='status'
                            value='à faire'
                            checked={this.state.status === 'à faire'}
                            onChange={this.onChange}
                        />
                        <Form.Field
                            label='fait'
                            control='input'
                            type='radio'
                            name='status'
                            value='fait'
                            checked={this.state.status === 'fait'}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                </Form>

                <div className={"btnGroup"}>
                    <Button.Group attached='bottom'>
                        <Button
                            content="Créer la tâche"
                            onClick={this.onSubmit}
                            positive
                            disabled={false}
                        />
                        <Button.Or text='ou' />
                        <Button content="Annuler" onClick={() => Router.push('/')} />
                    </Button.Group>

                    <style jsx>{`
            .addForm{
              margin-top: 20px;
            }
            .btnGroup{
              margin: 20px 0px;
            }
          
          `}</style>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerTask }
)(AddForm);
