import React, { Component } from 'react'
import CheckBox from '../layouts/CheckBox';
import { connect } from 'react-redux';
import { taskActions } from '../../actions';

export class CompleteTaskComponent extends Component {
    state = {
        // checked: false,
        id: this.props.task.id,
        completed: this.props.task.completed
    }

    handleCheckboxChange = event => {
        this.setState({ completed: event.target.checked });

        this.props.markTaskCompleted(this.state.id, event.target.checked);
        console.log(event.target.checked)
    }

    render() {
        return (
            <div style={{ fontFamily: 'system-ui' }}>
                <label>
                    <CheckBox
                        id="checkbox"
                        checked={this.state.completed}
                        onChange={this.handleCheckboxChange}
                    />
                    <span style={{ paddingRight: 18 }}>{this.state.completed ? ' Yes' : ' No'}</span>
                </label>
            </div>
        )
    }
}


const mapStateToProps = state => ({
});

const actionCreators = {
    markTaskCompleted: taskActions.markTaskAsCompleted
}

export default connect(mapStateToProps, actionCreators)(CompleteTaskComponent)
