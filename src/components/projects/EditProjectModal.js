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
import { projectActions } from '../../actions/project.actions';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class EditProjectModal extends Component {
    state = {
        rowId: null,
        modal: false,
        submitted: false,
        projectData: {
            id: '',
            projectName: ''
        }

    }

    toggle = () => {
        const { project } = this.props;
        this.setState({
            modal: !this.state.modal,
            submitted: false,
            projectData: {
                id: project.id,
                projectName: project.projectName,
            }
        });
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const { projectData } = this.state;
        this.setState({
            projectData: {
                ...projectData,
                [name]: value
            }
        });

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { projectData } = this.state;
        if (projectData.projectName) {
            // Add item via addItem action
            this.props.updateProject(projectData);
            this.toggle();
        }
    }


    render() {
        const { submitted, projectData } = this.state;

        return (
            <Fragment>
                <Button color="info" className="btn-sm" onClick={this.toggle} >
                    <FontAwesomeIcon icon={faPen} />
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit Project</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="projectName">Project Name</Label>
                                <Input
                                    className={submitted && !projectData.projectName ? 'is-invalid' : ''}
                                    type="text"
                                    name="projectName"
                                    id="projectName"
                                    placeholder="Department Name"
                                    onChange={this.onChange}
                                    defaultValue={this.state.projectData.projectName}
                                />
                                {submitted && !projectData.projectName &&
                                    <small className="help-block text-danger">Project Name is required</small>
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
    updateProject: projectActions.updateProject
}

export default connect(mapStateToProps, actionCreators)(EditProjectModal)
