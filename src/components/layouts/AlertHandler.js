import React, { Component, Fragment } from 'react'
import { Alert } from 'reactstrap';

export class AlertHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.alert !== this.props.alert) {
            this.setState({ visible: true }, () => {
                window.setTimeout(() => {
                    this.setState({ visible: false })
                }, 3000)
            });
        }
    }
    render() {
        const { alert } = this.props;

        return (
            <Fragment>
                {alert.message &&
                    <Alert isOpen={this.state.visible} className={`alert alert-${alert.type}`}>Error: {alert.message}</Alert>
                }
            </Fragment>
        )
    }
}

export default AlertHandler
