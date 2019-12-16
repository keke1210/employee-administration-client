import React, { Component, Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CheckBox from '../layouts/CheckBox';
import { taskActions, userActions, projectActions } from '../../actions';


export class EditTaskModal extends Component {
    state = {
        rowId: null,
        modal: false,
        submitted: false,
        checked: false,
        taskData: {
            id: '',
            taskName: '',
            description: '',
            completed: ''
        }

    }

    componentDidMount() {
        this.props.getProjects();
        this.props.getUsers();
    }

    handleCheckboxChange = event => {
        this.setState({ checked: event.target.checked })
    }


    toggle = () => {
        const { task } = this.props;
        this.setState({
            modal: !this.state.modal,
            submitted: false,
            checked: task.completed,
            taskData: {
                id: task.id,
                taskName: task.taskName,
                description: task.description,
                completed: task.completed
            }
        });
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const { taskData } = this.state;
        this.setState({
            taskData: {
                ...taskData,
                [name]: value
            }
        });

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { taskData } = this.state;
        if (taskData.taskName) {
            // Add item via addItem action
            this.props.updateTask(taskData);
            this.toggle();
        }
    }
    render() {
        const { submitted, taskData } = this.state;
        const { users, projects } = this.props;

        return (
            <Fragment>
                <Button color="info" className="btn-sm" onClick={this.toggle} >
                    <FontAwesomeIcon icon={faPen} />
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit Task</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="taskName">Task Name</Label>
                                <Input
                                    className={submitted && !taskData.departmentName ? 'is-invalid' : ''}
                                    type="text"
                                    name="taskName"
                                    id="taskName"
                                    placeholder="Department Name"
                                    onChange={this.onChange}
                                    defaultValue={this.state.taskData.taskName}
                                />
                                {submitted && !taskData.taskName &&
                                    <small className="help-block text-danger">Task Name is required</small>
                                }
                            </FormGroup>

                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input
                                    className={submitted && !taskData.description ? 'is-invalid' : ''}
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    onChange={this.onChange}
                                    defaultValue={this.state.taskData.description}
                                />
                                {submitted && !taskData.description &&
                                    <small className="help-block text-danger">Description is required</small>
                                }
                            </FormGroup>

                            <FormGroup>
                                <Label for="taskName">Project</Label>
                                <select className={`custom-select`} name="projectId" id="departmentID" onChange={this.onChange}>
                                    <option>Select project</option>
                                    {projects && projects.items &&
                                        projects.items.map((project, index) => (
                                            <option key={index} value={project.id}>{project.projectName}</option>
                                        ))}
                                </select>

                            </FormGroup>
                            <FormGroup>
                                <Label for="taskName">User</Label>
                                <select className={`custom-select`} name="userId" id="departmentID" onChange={this.onChange}>
                                    <option>Select user</option>
                                    {users && users.items &&
                                        users.items.map((user, index) => (
                                            <option key={index} value={user.id}>{user.userName}</option>
                                        ))}
                                </select>
                            </FormGroup>
                            <br></br>
                            <FormGroup style={{ fontFamily: 'system-ui' }}>
                                <label>
                                    <CheckBox
                                        id="checkbox"
                                        checked={this.state.checked}
                                        onChange={this.handleCheckboxChange}
                                    />
                                    <span style={{ marginLeft: 18 }}>Completed</span>
                                </label>
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Edit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users,
    projects: state.projects
});

const actionCreators = {
    updateTask: taskActions.updateTask,
    getUsers: userActions.getAll,
    getProjects: projectActions.getAll,
}


export default connect(mapStateToProps, actionCreators)(EditTaskModal);
