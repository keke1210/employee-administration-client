import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { addTask } from '../../actions/tasks';

class Form extends Component {
    state = {
        taskName: '',
        description: '',
        completed: false,
        projectId: 1,
        userId: 1
    }

    static propTypes = {
        addTask: PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        console.log(this.state)

        e.preventDefault();
        const { taskName, description, completed } = this.state;
        const task = {
            taskName,
            description,
            completed,
            projectId: 1,
            userId: 1
        };

        this.props.addTask(task);
        this.setState({
            taskName: "",
            description: "",
            completed: false
        });
    }

    render() {

        const { taskName, description, completed } = this.state;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Task</h2>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Task Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="taskName"
                            onChange={this.onChange}
                            value={taskName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Task Description</label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="description"
                            onChange={this.onChange}
                            value={description}
                        />
                    </div>
                    <div className="form-group">
                        <label>Completed</label>
                        <input
                            className="form-control"
                            type="text"
                            name="completed"
                            onChange={this.onChange}
                            value={completed}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { addTask })(Form);