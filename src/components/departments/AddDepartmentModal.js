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
import { departmentActions } from '../../actions/department.actions';
import PropTypes from 'prop-types';


export class AddDepartmentModal extends Component {
    state = {
        modal: false,
        submitted: false,
        departmentData: {
            departmentName: ''
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            submitted: false,
            departmentData: {
                departmentName: ''
            }
        });
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const { departmentData } = this.state;
        this.setState({
            departmentData: {
                ...departmentData,
                [name]: value
            }
        });

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        });


        const { departmentData } = this.state;
        if (departmentData && departmentData.departmentName) {
            this.props.addDepartment(departmentData);
            this.toggle();
        }
    }

    render() {
        const { submitted, departmentName } = this.state;

        return (
            <div>
                <Button
                    color='dark'
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >
                    Add Department
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add Department
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="departmentName">Department Name</Label>

                                <Input
                                    className={submitted && !departmentName ? 'is-invalid' : ''}
                                    type="text"
                                    name="departmentName"
                                    id="departmentName"
                                    placeholder="Department Name"
                                    onChange={this.onChange}
                                />
                                {submitted && !departmentName &&
                                    <small className="help-block text-danger">Department Name is required</small>
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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated
})
const actionCreators = {
    addDepartment: departmentActions.createDepartment
}

export default connect(mapStateToProps, actionCreators)(AddDepartmentModal)
