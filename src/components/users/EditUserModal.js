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
import { userActions } from '../../actions/user.actions';
import { departmentActions } from '../../actions/department.actions';
import PropTypes from 'prop-types';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class EditUserModal extends Component {
    state = {
        rowId: null,
        modal: false,
        submitted: false,
        userData: {
            id: '',
            firstName: '',
            lastName: '',
            userName: '',
            departmentId: '',
            password: '',
            confirmPassword: ''
        }

    }

    static propTypes = {
        isAdmin: PropTypes.bool
    };

    toggle = () => {
        const { user } = this.props;
        this.setState({
            modal: !this.state.modal,
            submitted: false,
            userData: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                departmentId: user.departmentId,
            }
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
            userData.password && userData.confirmPassword) {

            if ((userData.password && userData.confirmPassword) && userData.password === userData.confirmPassword) {
                // Add item via addItem action
                this.props.updateUser(userData);
                this.toggle();
            }
        }
    }

    render() {
        const { submitted, userData } = this.state;
        const { departmentsDropDown } = this.props;
        return (
            <Fragment>
                <Button color="info" className="btn-sm" onClick={this.toggle} >
                    <FontAwesomeIcon icon={faPen} />
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
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
                                    defaultValue={this.state.userData.userName}
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
                                    defaultValue={this.state.userData.firstName}
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
                                    defaultValue={this.state.userData.lastName}

                                />
                                {submitted && !userData.lastName &&
                                    <small className="help-block text-danger">Last Name is required</small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="departmentId">Department</Label>
                                <select
                                    defaultValue={this.state.userData.departmentId}
                                    className={`custom-select ${submitted && !userData.departmentId ? 'is-invalid' : ''}`}
                                    name="departmentId"
                                    id="departmentId"
                                    onChange={this.onChange}
                                >
                                    <option>Select department</option>
                                    {departmentsDropDown && departmentsDropDown.departments &&
                                        departmentsDropDown.departments.map((department, index) => (
                                            <option key={index} value={department.id}>{department.departmentName}</option>
                                        ))}
                                </select>
                            </FormGroup>
                            {/* <FormGroup>

                                <select className={`custom-select ${submitted && !userData.role ? 'is-invalid' : ''}`} name="role" onChange={this.onChange}>
                                    <option>Select role</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Administrator">Administrator</option>
                                </select>
                                {submitted && !userData.role &&
                                    <small className="help-block text-danger">Role is required</small>
                                }
                            </FormGroup> */}
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    className={submitted && !userData.password ? 'is-invalid' : ''}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Please enter new password"
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
                                    placeholder="Please confirm the new password"
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
    users: state.items,
    departmentsDropDown: state.departmentsDropDown
});

const actionCreators = {
    updateUser: userActions.updateUser,
    getDepartments: departmentActions.getAllDepartmentsDropDown,

}


export default connect(mapStateToProps, actionCreators)(EditUserModal);
