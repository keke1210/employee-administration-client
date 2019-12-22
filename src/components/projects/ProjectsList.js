import React, { Component, Fragment } from 'react';
import { Table, Spinner, Button, Container, Row, Col, Input } from 'reactstrap';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { history } from '../../_helpers';

import { connect } from 'react-redux';
import { projectActions } from '../../actions';
import AddProjectModal from './AddProjectModal'
import EditProjectModal from './EditProjectModal';
import ProjectsPaginationHelper from './ProjectsPaginationHelper';


export class ProjectsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            pageSize: 5,
            baseUrl: 'https://localhost:44339/api/v1/projects?',
            currentPage: 1
        }

        this.onClickPageLink = this.onClickPageLink.bind(this);
    }

    componentDidMount() {
        this.props.getProjects();
    }

    handleDeleteProject = (id) => {
        return (e) => this.props.deleteProject(id);
    }

    onDoubleClick = (id) => {
        return (e) => history.push(`/projects/${id}`);
    }



    onClickNextPage = (uri, next) => {
        return (e) => {
            this.setState({
                currentPage: next === true ? this.state.currentPage + 1 : this.state.currentPage - 1
            });
            this.props.getPrevNextProjects(`${uri}&searchText=${this.state.searchText}`);
        }
    }

    onClickPageLink = (pageNumber) => {
        return (e) => {
            this.setState({
                currentPage: pageNumber
            });

            this.props.getPrevNextProjects(`${this.state.baseUrl}pageNumber=${pageNumber}&pageSize=${this.state.pageSize}&searchText=${this.state.searchText}`);
        }
    }

    onChangeSearchText = (event) => {
        this.setState({
            searchText: [event.target.value],
        });

        this.props.getPrevNextProjects(`${this.state.baseUrl}searchText=${event.target.value}&pageSize=${this.state.pageSize}`);
    }

    onChangeDropDown = (event) => {
        this.setState({
            pageSize: [event.target.value],
        });
        this.props.getPrevNextProjects(`${this.state.baseUrl}pageSize=${event.target.value}&pageNumber=${this.state.currentPage}&searchText=${this.state.searchText}`);
    }


    render() {
        const { projects, departments } = this.props;
        console.log(departments);

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <h2>Projects</h2>
                            <AddProjectModal />
                        </Col>
                        <Col>
                            <Input
                                className="col-md-6"
                                style={{ float: "right", marginTop: "4rem" }}
                                type="text" name="searchText"
                                onChange={this.onChangeSearchText}
                                placeholder="Search"
                            />
                        </Col>
                    </Row>
                </Container>

                <Table className="table table-striped" responsive hover striped>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            {/* <th>Id</th> */}
                            <th>Project Name</th>
                            {/* <th>Part of department</th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.items && projects.items.data && projects.items.data.map((project, index) =>
                            (
                                <tr key={project.id} onDoubleClick={this.onDoubleClick(project.id)}>
                                    <td>{((this.state.currentPage - 1) * this.state.pageSize) + index + 1}</td>
                                    {/* <td>{project.id}</td> */}
                                    <td>{project.projectName}</td>
                                    {/* <td>{project.departmentID}</td> */}
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

                <ProjectsPaginationHelper projects={projects && projects.items}
                    onClickNextPage={this.onClickNextPage(projects && projects.items && projects.items.nextPage, true)}
                    onClickPrevPage={this.onClickNextPage(projects && projects.items && projects.items.previousPage, false)}
                    onClickPageLink={this.onClickPageLink}
                    currentPage={this.state.currentPage}
                />

                <select className="custom-select col-md-3" name="pageSize" onChange={this.onChangeDropDown}>
                    <option value="5">Page Size</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>

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
    deleteProject: projectActions.delete,
    getPrevNextProjects: projectActions.getPrevNextProjects
}


export default connect(mapStateToProps, actionCreators)(ProjectsList)
