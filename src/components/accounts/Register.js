import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { userActions } from '../../actions';


export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                userName: '',
                password: '',
                confirmPassword: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.userName && user.password && user.confirmPassword) {
            this.props.register(user);
        }
    }

    render() {

        const { registering } = this.props;
        const { user, submitted } = this.state;

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                className={`form-control ${submitted && !user.firstName ? 'is-invalid' : ''}`}
                                placeholder="First Name"
                                name="firstName"
                                onChange={this.handleChange}
                                value={user.firstName}
                            />
                            {submitted && !user.firstName &&
                                <small className="help-block text-danger">First Name is required</small>
                            }
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className={`form-control ${submitted && !user.lastName ? 'is-invalid' : ''}`}
                                placeholder="Last Name"
                                name="lastName"
                                onChange={this.handleChange}
                                value={user.lastName}

                            />
                            {submitted && !user.lastName &&
                                <small className="help-block text-danger">Last Name is required</small>
                            }
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className={`form-control ${submitted && !user.userName ? 'is-invalid' : ''}`}
                                placeholder="Username"
                                name="userName"
                                onChange={this.handleChange}
                                value={user.userName}

                            />
                            {submitted && !user.userName &&
                                <small className="help-block text-danger">Username is required</small>
                            }
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className={`form-control ${submitted && !user.password ? 'is-invalid' : ''}`}
                                placeholder="Password"
                                name="password"
                                onChange={this.handleChange}
                                value={user.password}
                            />
                            {submitted && !user.password &&
                                <small className="help-block text-danger">Password is required</small>
                            }
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className={`form-control ${submitted && !user.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={this.handleChange}
                                value={user.confirmPassword}
                            />
                            {submitted && !user.confirmPassword &&
                                <small className="help-block text-danger">Confirm Password is required</small>
                            }
                        </div>
                        <div className="form-group">
                            <Button type="submit"
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block
                            >
                                Login
                            </Button>
                            {registering &&
                                <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}


export default connect(mapState, actionCreators)(Register);