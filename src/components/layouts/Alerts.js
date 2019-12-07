import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.TaskName) {
                alert.error(error.msg.TaskName.join());
            }
            if (error.msg.Description) {
                alert.error(error.msg.Description.join());
            }
        }

        if (message !== prevProps.message) {
            if (message.taskAdded) {
                alert.success(message.taskAdded);
            }
        }
    }


    render() {
        return (
            null
        );
    }
}


const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));