import React, { Component } from 'react'
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
import PropTypes from 'prop-types';


export class EditUserModal extends Component {
    state = {
        rowId: null,
        modal: false,
        submitted: false,
        userData: {
            firstName: '',
            lastName: '',
            userName: '',
            role: '',
            password: '',
            confirmPassword: ''
        }

    }

    static propTypes = {
        isAdmin: PropTypes.bool
    };


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

        return (
            <div>
                <Button
                    color='dark'
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >
                    Edit User
                </Button>



                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add User</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item"></Label>
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

                                <select className={`custom-select ${submitted && !userData.role ? 'is-invalid' : ''}`} name="role" onChange={this.onChange}>
                                    <option>Select role</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Administrator">Administrator</option>
                                </select>
                                {submitted && !userData.role &&
                                    <small className="help-block text-danger">Role is required</small>
                                }
                            </FormGroup>
                            <FormGroup>
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
                                >Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

export default EditUserModal
