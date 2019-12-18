import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';

import { connect } from 'react-redux';
import { projectActions } from '../../actions';

export class ProjectTasks extends Component {
    componentDidMount() {
        const { match } = this.props;
        this.props.getProjectTasks(match.params.id);
    }


    render() {
        const { projects } = this.props;

        console.log(projects.items);


        return (
            <Fragment>
                <h4>Department with id {this.props.match.params.id} : Tasks</h4>
                <Table className="table table-striped" responsive hover striped>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            <th>Id</th>
                            <th>Task Name</th>
                            <th>Description></th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.items && projects.items.map((task, index) =>
                            (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{task.id}</td>
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
});

const actionCreators = {
    getProjectTasks: projectActions.getProjectTasks,
}

export default connect(mapStateToProps, actionCreators)(ProjectTasks);
