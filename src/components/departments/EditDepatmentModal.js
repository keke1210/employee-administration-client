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
import { departmentActions } from '../../actions/department.actions';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class EditDepatmentModal extends Component {
    state = {
        rowId: null,
        modal: false,
        submitted: false,
        departmentData: {
            departmentName: ''
        }

    }

    toggle = () => {
        const { department } = this.props;
        this.setState({
            modal: !this.state.modal,
            submitted: false,
            departmentData: {
                id: department.id,
                departmentName: department.departmentName,
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
        this.setState({ submitted: true });
        const { departmentData } = this.state;
        if (departmentData.departmentName) {
            // Add item via addItem action
            this.props.updateDepartment(departmentData);
            this.toggle();
        }
    }

    render() {
        const { submitted, departmentData } = this.state;

        return (
            <Fragment>
                <Button color="info" className="btn-sm" onClick={this.toggle} >
                    <FontAwesomeIcon icon={faPen} />
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit Department</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="departmentName">Department Name</Label>

                                <Label for="userName">Department Name</Label>
                                <Input
                                    className={submitted && !departmentData.departmentName ? 'is-invalid' : ''}
                                    type="text"
                                    name="departmentName"
                                    id="departmentName"
                                    placeholder="Department Name"
                                    onChange={this.onChange}
                                    defaultValue={this.state.departmentData.departmentName}
                                />
                                {submitted && !departmentData.departmentName &&
                                    <small className="help-block text-danger">Department Name is required</small>
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

});

const actionCreators = {
    updateDepartment: departmentActions.updateDepartment
}

export default connect(mapStateToProps, actionCreators)(EditDepatmentModal);
