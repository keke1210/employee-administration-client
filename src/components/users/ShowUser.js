import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../actions/user.actions';
import { projectActions } from '../../actions/project.actions';
import { Form, Row, Col, FormGroup, Button, Table, Input, Container, Label } from 'reactstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export class ShowUser extends Component {
    state = {
        userId: '',
        projectId: '',
        taskId: ''
    }

    componentDidMount() {
        const { match } = this.props;
        this.props.getUserById(match.params.id);
        this.props.getProjects();
        this.props.getUserProjects(match.params.id);

        this.setState({ userId: match.params.id })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onClick = (e) => {
        e.preventDefault();
        const userId = this.state.userId;
        const projectId = this.state.projectId;

        if (userId && projectId) {
            this.props.addUserProject(userId, projectId);
        }
    }

    handleUserProjectDelete(projectId) {
        return (e) => {
            const { match } = this.props;

            if (projectId) {
                this.props.removeUserProject(match.params.id, projectId)
            }
        }
    }


    render() {
        const { showUser, projectsDropDown, userProjects } = this.props;

        const userData = showUser && showUser.user;
        const projects = projectsDropDown && projectsDropDown.projects;
        const userProjectsData = userProjects && userProjects.userProjects;

        return (
            <Container>
                <div>
                    <Col >
                        <h4>User details :</h4>
                    </Col>
                    <Container>
                        <Row >
                            <Col md={6}> <Label><b>Username:</b> {`${userData && userData.userName}`}</Label> </Col>
                            <Col md={6}><Label><b>First Name:</b> {`${userData && userData.firstName}`}</Label></Col>
                            <Col md={6}><Label><b>Last Name:</b> {`${userData && userData.lastName}`}</Label></Col>
                            <Col md={6}><Label><b>Role:</b> {`${userData && userData.role}`}</Label></Col>
                        </Row>
                        <hr />
                    </Container>
                </div>
                <br></br>
                <Row style={{ marginLeft: '2px' }}>
                    <Col sm={11}>
                        <h6>Add projects to user</h6>
                        <FormGroup>
                            {userData && userData.projectId && <Label for="projectId">Projects</Label>}

                            <select className={`custom-select`} name="projectId" id="projectId" onChange={this.onChange}>
                                <option>Select Project</option>
                                {projects && projects.map((project, index) => (
                                    <option key={index} value={project.id}>{project.projectName}</option>
                                ))}
                            </select>

                        </FormGroup>

                    </Col>
                    <Col style={{ float: 'right', marginTop: '27px' }} onClick={this.onClick}>
                        <Button title="Add project to user" color="dark">Add</Button>
                    </Col>
                </Row>
                <Col sm={12} >
                    <Table style={{ marginTop: '1rem' }} responsive hover striped>
                        <thead>
                            <tr>
                                <th>#No</th>
                                <th>Project Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userProjectsData && userProjectsData.map((project, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{project.projectName}</td>
                                    <td>
                                        <Button
                                            style={{ float: 'right' }}
                                            onClick={this.handleUserProjectDelete(project.id)}
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
    projects: state.projects,
    showUser: state.showUser,
    projectsDropDown: state.projectsDropDown,
    userProjects: state.userProjects
});

const actionCreators = {
    getUserById: userActions.getUserById,
    getUserProjects: userActions.getUserProjects,
    getProjects: projectActions.getAllProjectsDropDown,
    addUserProject: userActions.addUserProject,
    removeUserProject: userActions.removeUserProject,
}

export default connect(mapStateToProps, actionCreators)(ShowUser);
