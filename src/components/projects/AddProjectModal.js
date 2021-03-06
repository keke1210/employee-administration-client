import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { projectActions } from '../../actions/project.actions';
import { departmentActions } from '../../actions';

export class AddProjectModal extends Component {
    state = {
        modal: false,
        submitted: false,
        projectData: {
            projectName: '',
        },
        departmentID: ''
    }

    componentDidMount() {
        this.props.getDepartments();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            submitted: false,
            projectData: {
                projectName: '',
                departmentID: ''
            },

        });
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const { projectData } = this.state;
        this.setState({
            projectData: {
                ...projectData,
                [name]: value
            },
            [name]: value
        });

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        });


        const { projectData } = this.state;
        if (projectData && projectData.projectName) {
            this.props.addProject(projectData);
            this.toggle();
        }
    }
    render() {
        const { submitted, projectName } = this.state;
        const { departmentsDropDown } = this.props;

        console.log(departmentsDropDown);

        return (
            <div>
                <Button
                    color='dark'
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >
                    Add Project
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add Project
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="projectName">Project Name</Label>

                                <Input
                                    className={submitted && !projectName ? 'is-invalid' : ''}
                                    type="text"
                                    name="projectName"
                                    id="projectName"
                                    placeholder="Project Name"
                                    onChange={this.onChange}
                                />
                                {submitted && !projectName &&
                                    <small className="help-block text-danger">Project Name is required</small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="departmentID">Department</Label>

                                <select
                                    className={`custom-select ${submitted && !this.state.projectData.departmentID ? 'is-invalid' : ''}`}
                                    name="departmentID"
                                    id="departmentID"
                                    onChange={this.onChange}
                                >
                                    <option value="0">Select department</option>
                                    {departmentsDropDown && departmentsDropDown.departments &&
                                        departmentsDropDown.departments.map((department, index) => (
                                            <option key={index} value={department.id}>{department.departmentName}</option>
                                        ))}
                                </select>
                                {submitted && !this.state.projectData.departmentID &&
                                    <small className="help-block text-danger">Department is required</small>
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
    departmentsDropDown: state.departmentsDropDown,
})

const actionCreatos = {
    addProject: projectActions.createProject,
    getDepartments: departmentActions.getAllDepartmentsDropDown,
}

export default connect(mapStateToProps, actionCreatos)(AddProjectModal)
