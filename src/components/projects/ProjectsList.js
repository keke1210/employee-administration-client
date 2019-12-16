import React, { Component, Fragment } from 'react';
import { Table, Col, Spinner, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux';
import { projectActions } from '../../actions';
import AddProjectModal from './AddProjectModal'
import EditProjectModal from './EditProjectModal';


export class ProjectsList extends Component {

    componentDidMount() {
        this.props.getProjects();
    }

    handleDeleteProject = (id) => {
        return (e) => this.props.deleteProject(id);
    }

    render() {
        const { projects, departments } = this.props;
        console.log(departments);

        return (
            <Fragment>
                <h2>Projects</h2>
                <AddProjectModal />
                <Table className="table table-striped" responsive hover striped>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            <th>Id</th>
                            <th>Project Name</th>
                            <th>Part of department</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.items && projects.items.map((project, index) =>
                            (
                                <tr key={project.id}>
                                    <td>{index + 1}</td>
                                    <td>{project.id}</td>
                                    <td>{project.projectName}</td>
                                    <td>{project.departmentID}</td>
                                    <td className="tightcell">
                                        {' '}
                                        <EditProjectModal project={project} /> &nbsp;
                                        <Button className="btn btn-danger btn-sm" onClick={this.handleDeleteProject(project.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                    </tbody>

                </Table>
                {projects.loading && <Spinner type="grow" color="dark" />}

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.projects,
    departments: state.departments
});

const actionCreators = {
    getProjects: projectActions.getAll,
    deleteProject: projectActions.delete
}


export default connect(mapStateToProps, actionCreators)(ProjectsList)
