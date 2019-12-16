import React, { Component } from 'react';
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
import { taskActions, userActions, projectActions } from '../../actions';

export class AddTaskModal extends Component {
    state = {
        modal: false,
        submitted: false,
        taskData: {
            taskName: '',
            description: '',
            completed: ''
        }
    }
    componentDidMount() {
        this.props.getProjects();
        this.props.getUsers();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            submitted: false,
            taskData: {
                taskName: '',
                description: '',
                completed: ''
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
        this.setState({
            submitted: true
        });


        const { taskData } = this.state;
        if (taskData && taskData.taskName && taskData.completed) {
            this.props.addTask(taskData);
            this.toggle();
        }
    }
    render() {
        const { submitted, taskData } = this.state;
        const { users, projects } = this.props;
        console.log(users)
        console.log(projects)
        // console.log(taskData)
        return (
            <div>
                <Button
                    color='dark'
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >
                    Add Task
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add Task
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="taskName">Task Name</Label>

                                <Input
                                    className={submitted && taskData && !taskData.taskName ? 'is-invalid' : ''}
                                    type="text"
                                    name="taskName"
                                    id="taskName"
                                    placeholder="Task Name"
                                    onChange={this.onChange}
                                />
                                {submitted && taskData && !taskData.taskName &&
                                    <small className="help-block text-danger">Task Name is required</small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="taskName">Description</Label>

                                <Input
                                    className={submitted && taskData && !taskData.description ? 'is-invalid' : ''}
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    onChange={this.onChange}
                                />
                                {submitted && taskData && !taskData.description &&
                                    <small className="help-block text-danger">Description is required</small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="taskName">Completed</Label>

                                <Input
                                    className={submitted && taskData && !taskData.completed ? 'is-invalid' : ''}
                                    type="text"
                                    name="completed"
                                    id="completed"
                                    placeholder="Completed"
                                    onChange={this.onChange}
                                />
                                {submitted && taskData && !taskData.completed &&
                                    <small className="help-block text-danger">Completed is required</small>
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


                            <FormGroup>
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Add</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users,
    projects: state.projects
})
const actionCreators = {
    getUsers: userActions.getAll,
    getProjects: projectActions.getAll,
    addTask: taskActions.createTask
}

export default connect(mapStateToProps, actionCreators)(AddTaskModal)
