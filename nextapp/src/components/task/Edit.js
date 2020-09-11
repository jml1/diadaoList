import React, { Component } from "react";
import { connect } from "react-redux";
import { editTask, getTask } from "../../actions/taskActions";
import { Form, Button, Radio } from 'semantic-ui-react';
import Router from "next/router";

class EditForm extends Component {
    constructor() {
        super();
        this.state = {
            task: {
                title: "",
                description: "",
                status: "",
                taskId: null,
            },
            error: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    async componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get('taskId');

        //getTaskById
        try{
            const task = (await getTask(taskId)).data;
    

            if (task) {
                this.setState(current => ({ ...current, title: task.title, description: task.description, status: task.status, taskId: task.id}));
            } else {
                this.setState(current => ({ ...current, error: "Aucune tâche trouvé" }));
            }
        }catch(err){
            this.setState(current => ({ ...current, error: "impossible d'éditer cette tâche" }));
        }
    }


    // Handle form all inputs change 
    onChange(e) {
        this.setState({[e.target.name]: e.target.value }, () => console.log(this.state));
    }

    onSubmit(e) {
        e.preventDefault();

        const editedTask = {
            title: this.state.title,
            description: this.state.description,
            status: this.state.status,
            taskId: this.state.taskId
        };

        this.props.editTask(editedTask);
    }

    render() {
        if (this.state.error) {
            return (
                <div className={"editForm"}>
                    <p>
                        {this.state.error}
                    </p>
                </div>
            );
        }

        return (
            <div className={"editForm"}>
                <Form>
                    <Form.Input
                        fluid
                        label='Titre'
                        placeholder='Titre'
                        name='title'
                        value={this.state.title}
                        onChange={this.onChange}
                    />
                    <Form.TextArea
                        fluid
                        label='Description'
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
                            content="Modifier la tâche"
                            onClick={this.onSubmit}
                            positive
                            disabled={false}
                        />
                        <Button.Or text='ou' />
                        <Button content="Annuler" onClick={() => Router.push('/')} />
                    </Button.Group>

                    <style jsx>{`
            .editForm{
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
    errors: state.errors,
    tasks: state.tasks.all,
});

export default connect(
    mapStateToProps,
    { editTask }
)(EditForm);
