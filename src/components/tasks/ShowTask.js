import React, { Component, Fragment } from 'react';
import { Label, Container, Row, Col, Button, FormGroup, Table } from 'reactstrap';
import { connect } from 'react-redux';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { taskActions } from '../../actions';

export class ShowTask extends Component {
    state = {
        projectId: '',
        userId: '',
        taskId: ''
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    onClick = (e) => {
        e.preventDefault();
        const userId = this.state.userId;
        const { match } = this.props;

        if (userId) {
            this.props.addUserTask(userId, match.params.id);
        }
    }

    componentDidMount() {
        const { match } = this.props;
        this.props.getTaskById(match.params.id);
        this.props.showUsersTaskDropdown(match.params.id);
        this.props.getUsersOfTask(match.params.id);
    }

    handleUserTaskDelete(userId) {
        return (e) => {
            const { match } = this.props;
            console.log(match.params.id)
            if (userId) {
                this.props.removeUserTask(userId, match.params.id)
            }
        }
    }

    render() {
        const { showTask, userTasksDropDown, userTasks } = this.props;

        const { task } = showTask;
        const { users } = userTasksDropDown;
        const userTasksData = userTasks && userTasks.userTasks;

        console.log(userTasks)
        return (
            <Container>
                <div>
                    <Col >
                        <h4>Task Details :</h4>
                    </Col>
                    <Container>
                        <Col md={6}> <Label><b>Task name:</b> {task && task.taskName} </Label></Col>
                        <Col md={6}><Label><b>Description:</b> {task && task.description}</Label></Col>
                        <Col md={6}><Label><b>Completed:</b> {task && task.completed ? 'Yes' : 'No'}</Label></Col>
                        <hr />
                    </Container>
                </div>
                <br />
                <Row style={{ marginLeft: '2px', marginTop: '1rem' }}>
                    <Col sm={11}>
                        <h5>Add users to task</h5>
                        <FormGroup>
                            <select className={`custom-select`} name="userId" id="userId" onChange={this.onChange}>
                                <option>Select User</option>
                                {users && users.map((user, index) => (
                                    <option key={index} value={user.id}>{user.userName}</option>
                                ))}
                            </select>

                        </FormGroup>

                    </Col>
                    <Col style={{ float: 'right', marginTop: '2rem' }} >
                        <Button title="Add project to user" color="dark" onClick={this.onClick}>Add</Button>
                    </Col>
                </Row>
                <Col sm={12} >
                    <Table style={{ marginTop: '1rem' }} responsive hover striped>
                        <thead>
                            <tr>
                                <th>#No</th>
                                <th>User Name</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTasksData && userTasksData.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>
                                        <Button
                                            style={{ float: 'right' }}
                                            onClick={this.handleUserTaskDelete(user.id)}
                                            title="Remove user from project"
                                            className="btn-sm"
                                            type="button"
                                            color="danger"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Col>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    userTasksDropDown: state.userTasksDropDown,
    showTask: state.showTask,
    userTasks: state.userTasks
});

const actionCreators = {
    showUsersTaskDropdown: taskActions.showUsersTaskDropdown,
    getTaskById: taskActions.getTaskById,
    getUsersOfTask: taskActions.getUsersOfTask,
    addUserTask: taskActions.addUserTask,
    removeUserTask: taskActions.removeUserTask,
}

export default connect(mapStateToProps, actionCreators)(ShowTask);
