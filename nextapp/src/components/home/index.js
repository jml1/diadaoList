import React from 'react';
import { connect } from 'react-redux';
import { Form, Table, Menu, Popup, Button, Icon, Checkbox } from 'semantic-ui-react';
import { getTasks, registerTask, editTask, deleteTask } from "../../actions/taskActions";
import Router from 'next/router';
import Link from 'next/Link';
import moment from 'moment';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    componentDidMount() {
        this.props.getTasks();
    }

    handleRadioChange = (e, task) => {
        this.props.editTask({
            title: task.title,
            description: task.description,
            status: e.target.value,
            taskId: task.id
        });
    }

    doRadio = (task) => (
        <Form>
            <Form.Field
                label='à faire'
                control='input'
                type='radio'
                name='status'
                value='à faire'
                checked={task.status === 'à faire'}
                onChange={(e) => this.handleRadioChange(e, task)}
            />
            <Form.Field
                label='fait'
                control='input'
                type='radio'
                name='status'
                value='fait'
                checked={task.status === 'fait'}
                onChange={(e) => this.handleRadioChange(e, task)}
            />
        </Form>
    );

    doTable = (tasks = this.props.tasks) => (
        <Table sortable fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Utilisateur</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Statut</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {tasks && tasks.map(task => (
                    <Table.Row>
                        <Table.Cell>{task.user && task.user.username}</Table.Cell>
                        <Table.Cell>{moment(task.updatedAt).format('DD/MM/YYYY')}</Table.Cell>
                        <Table.Cell>{task.title}</Table.Cell>
                        <Table.Cell>{task.description}</Table.Cell>
                        <Table.Cell>{this.doRadio(task)}</Table.Cell>
                        <Table.Cell>
                            <Button.Group>
                                {/* <Link prefetch href={`/task/edit/:taskId`} as={`/task/edit/${task.id}`}><a><Button ><Icon name='edit' /></Button></a></Link> */}
                                <Button onClick={() => Router.push({pathname: '/task/edit/', query: { taskId: task.id }})}><Icon name='edit' /></Button>
                                <Button onClick={() => this.props.deleteTask(task.id)}><Icon name='trash alternate outline' /></Button>
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );


    render() {
        return (
            <React.Fragment>
                <Menu icon>
                    <Popup content='Ajouter une tâche' trigger={
                        <Menu.Item
                            active={false}
                            icon="plus"
                            onClick={() => Router.push('task/add')}
                        />
                    } />
                </Menu>
                {this.doTable()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.all
    };
};

export default connect(
    mapStateToProps,
    { getTasks, registerTask, editTask, deleteTask }
)(Home);    
