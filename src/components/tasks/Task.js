import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTasks, deleteTask } from '../../actions/tasks';
import Form from './Form';

class Task extends Component {
    static propTypes = {
        tasks: PropTypes.array.isRequired,
        getTasks: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getTasks();
    }

    render() {
        return (
            <div className="container">
                <Fragment>
                    <Form />
                    <h2>Tasks</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Completed</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.description}</td>
                                    <td>{task.completed ? 'Yes' : 'No'}</td>
                                    <td><button className="btn btn-danger btn-sm" onClick={this.props.deleteTask.bind(this, task.id)}>
                                        Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Fragment>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks
})


export default connect(mapStateToProps, { getTasks, deleteTask })(Task);
