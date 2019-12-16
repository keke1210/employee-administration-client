import React, { Component, Fragment } from 'react';
import { Table, Col, Spinner, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux';
import { taskActions } from '../../actions';
import AddTaskModal from './AddTaskModal'
import EditTaskModal from './EditTaskModal';
import CompleteTaskComponent from './CompleteTaskComponent';

export class TaskList extends Component {


    componentDidMount() {
        this.props.getTasks();
    }

    handleDeleteTask(id) {
        return (e) => this.props.deleteTask(id)
    }
    render() {
        const { tasks } = this.props;
        return (
            <Fragment>
                <h2>Tasks</h2>
                <AddTaskModal />
                <Table className="table table-striped" responsive hover striped>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            <th>Id</th>
                            <th>Task Name</th>
                            <th>Description></th>
                            <th>Completed</th>
                            {/* <th>Complete task</th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.items && tasks.items.map((task, index) =>
                            (
                                <tr key={task.id}>
                                    <td>{index + 1}</td>
                                    <td>{task.id}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.description}</td>
                                    {/* <td>{task.completed ? 'Yes' : 'No'}</td> */}
                                    <td><CompleteTaskComponent task={task} /> </td>
                                    <td className="tightcell">
                                        {' '}
                                        <EditTaskModal task={task} /> &nbsp;
                                        <Button className="btn btn-danger btn-sm" onClick={this.handleDeleteTask(task.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                    </tbody>

                </Table>
                {tasks.loading && <Spinner type="grow" color="dark" />}

            </Fragment>
        )
    }
}



const mapStateToProps = state => ({
    tasks: state.tasks,
    task: state.task
});

const actionCreators = {
    getTasks: taskActions.getAll,
    deleteTask: taskActions.delete
}

export default connect(mapStateToProps, actionCreators)(TaskList)
