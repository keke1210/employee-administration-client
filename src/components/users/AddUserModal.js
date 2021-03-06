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
import { userActions } from '../../actions/user.actions';
import { departmentActions } from '../../actions/department.actions';

import PropTypes from 'prop-types';
import { projectActions } from '../../actions';

class AddUserModal extends Component {
    state = {
        modal: false,
        submitted: false,
        userData: {
            firstName: '',
            lastName: '',
            userName: '',
            role: '',
            password: '',
            confirmPassword: '',
            departmentID: '',
            projectId: ''
        },
        isEmployee: true
    }

    // static propTypes = {
    //     isAdmin: PropTypes.bool
    // };

    componentDidMount() {
        this.props.getDepartments();
        this.props.getProjects();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            submitted: false,
            userData: {}
        });
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const { userData } = this.state;
        this.setState({
            userData: {
                ...userData,
                [name]: value
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userData } = this.state;

        if (userData.firstName && userData.lastName && userData.userName &&
            userData.role && userData.password && userData.confirmPassword) {

            if (userData.password === userData.confirmPassword) {

                // Add item via addItem action
                this.props.addUser(userData);
                this.toggle();
            }
        }
    }

    render() {
        const { submitted, userData } = this.state;
        const { projectsDropDown, departmentsDropDown } = this.props;

        console.log(projectsDropDown);
        return (
            <div>
                <Button
                    color='dark'
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >
                    Add User
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add User
                        {/* {buttonLabel === "Add" ? "Add User" : "Edit User"} */}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="userName">Username</Label>

                                <Input
                                    className={submitted && !userData.userName ? 'is-invalid' : ''}
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    placeholder="Username"
                                    onChange={this.onChange}
                                />
                                {submitted && !userData.userName &&
                                    <small className="help-block text-danger">Username is required</small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input
                                    className={submitted && !userData.firstName ? 'is-invalid' : ''}
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First Name"
                                    onChange={this.onChange}
                                />
                                {submitted && !userData.firstName &&
                                    <small className="help-block text-danger">First Name is required</small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    className={submitted && !userData.lastName ? 'is-invalid' : ''}
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last Name"
                                    onChange={this.onChange}
                                />
                                {submitted && !userData.lastName &&
                                    <small className="help-block text-danger">Last Name is required</small>
                                }
                            </FormGroup>

                            <FormGroup>
                                <Label for="role">Role</Label>
                                <select
                                    className={`custom-select ${submitted && !userData.role ? 'is-invalid' : ''}`}
                                    name="role"
                                    id="role"
                                    onChange={this.onChange}
                                >
                                    <option>Select role</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Administrator">Administrator</option>
                                </select>
                                {submitted && !userData.role &&
                                    <small className="help-block text-danger">Role is required</small>
                                }

                            </FormGroup>
                            {userData.role === "Employee" && <FormGroup>
                                {userData.departmentID && <Label for="departmentID">Department</Label>}

                                {!userData.departmentID && <small className="text-danger">Please assign a department to this user</small>}

                                <select
                                    className={`custom-select ${submitted && !userData.departmentID ? 'is-invalid' : ''}`}
                                    name="departmentID"
                                    id="departmentID"
                                    onChange={this.onChange}
                                >
                                    <option>Select department</option>
                                    {departmentsDropDown && departmentsDropDown.departments &&
                                        departmentsDropDown.departments.map((department, index) => (
                                            <option key={index} value={department.id}>{department.departmentName}</option>
                                        ))}
                                </select>
                                {submitted && !userData.departmentID && userData.role && userData.role === "Employee" &&
                                    <small className="help-block text-danger">Department is required</small>
                                }
                            </FormGroup>}
                            {/* <FormGroup>
                                {userData.projectId && <Label for="projectId">Projects</Label>}

                                <select className={`custom-select`} name="projectId" id="projectId" onChange={this.onChange}>
                                    <option>Select Project</option>
                                    {projectsDropDown && projectsDropDown.projects &&
                                        projectsDropDown.projects.map((project, index) => (
                                            <option key={index} value={project.id}>{project.projectName}</option>
                                        ))}
                                </select>

                            </FormGroup> */}
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    className={submitted && !userData.password ? 'is-invalid' : ''}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                                {submitted && !userData.password &&
                                    <small className="help-block text-danger">Password is required</small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword">Confirm Password</Label>

                                <Input
                                    className={submitted && !userData.confirmPassword ? 'is-invalid' : ''}
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={this.onChange}
                                />
                                {submitted && !userData.confirmPassword &&
                                    <small className="help-block text-danger">Confirm Password is required</small>
                                }
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

            </div >
        );
    }

}

const mapStateToProps = state => ({
    item: state.item,
    isAdmin: state.authentication.user.isAdmin,
    departmentsDropDown: state.departmentsDropDown,
    projectsDropDown: state.projectsDropDown
});

const actionCreators = {
    addUser: userActions.createUser,
    getDepartments: departmentActions.getAllDepartmentsDropDown,
    getProjects: projectActions.getAllProjectsDropDown
}

export default connect(mapStateToProps, actionCreators)(AddUserModal);
