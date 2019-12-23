import React, { Component, Fragment } from 'react';
import { Table, Row, Label } from 'reactstrap';

import { connect } from 'react-redux';
import { projectActions } from '../../actions';
import { projectsConstants } from '../../_constants';

export class ProjectTasks extends Component {
    componentDidMount() {
        const { match } = this.props;

        this.props.getProjectById(match.params.id);

        this.props.getProjectTasks(match.params.id);
    }


    render() {
        const { projects, projectById } = this.props;


        return (
            <Fragment>
                <h4>Project details:</h4>
                <Label><b>Project name :</b> {projectById && projectById.projectName} </Label>
                <hr />
                <br />
                <h6>Tasks of this Project: </h6>
                <Table className="table table-striped" responsive hover striped>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            <th>Task Name</th>
                            <th>Description</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.items && projects.items.data && projects.items.data.map((task, index) =>
                            (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.description}</td>
                                    <td>{task.completed ? 'Yes' : 'No'}</td>

                                </tr>
                            ))}

                    </tbody>

                </Table>
                {/* {tasks.loading && <Spinner type="grow" color="dark" />} */}

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects,
    projectById: state.projectById
});

const actionCreators = {
    getProjectTasks: projectActions.getProjectTasks,
    getProjectById: projectActions.getProjectById
}

export default connect(mapStateToProps, actionCreators)(ProjectTasks);
