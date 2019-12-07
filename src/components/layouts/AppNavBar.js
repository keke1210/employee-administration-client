import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }


    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;


        const authLinks = (
            <Fragment>
                <Nav className="ml-auto">
                    <NavItem>
                        <button onClick={this.props.logout} className="nac-link btn btn-info btn-sm text-light">Log out</button>
                    </NavItem>
                </Nav>
            </Fragment>
        );


        const guestLinks = (
            <Fragment>
                <Nav className="ml-auto">
                    <NavItem>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                            Login &nbsp;&nbsp;
                                    </Link>
                    </NavItem>
                </Nav>

                <Nav>
                    <NavItem>
                        <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                            Register
                                </Link>
                    </NavItem>
                </Nav>
            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <Nav>
                            <NavItem>
                                <Link className="navbar-brand" to="/">
                                    Employee Administration
                                </Link>
                            </NavItem>
                        </Nav>
                        <NavbarToggler onClick={this.toggle}> ></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>

                            {isAuthenticated ? authLinks : guestLinks}

                        </Collapse>

                    </Container>
                </Navbar>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, { logout })(AppNavBar);