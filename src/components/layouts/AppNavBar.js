import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Role } from '../../_helpers';

class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));

        const authLinks = (
            <Fragment>
                {user && user.role === Role.Administrator &&
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to="/users" style={{ textDecoration: 'none', color: 'white' }}>Users</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/departments" style={{ textDecoration: 'none', color: 'white' }}>Departments</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/projects" style={{ textDecoration: 'none', color: 'white' }}>Projects</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/tasks" style={{ textDecoration: 'none', color: 'white' }}>Tasks</Link>
                        </NavItem>
                    </Nav>}
                <Nav className="mr-auto">
                    <NavItem>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>Profile</Link>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto">
                    <NavItem>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }} >Logout</Link>
                    </NavItem>
                </Nav>

            </Fragment>
        );


        const guestLinks = (
            <Fragment>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                            Login &nbsp;&nbsp;
                        </Link>
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
                    <Container className="col-md-11">
                        <Nav>
                            <NavItem>
                                <Link className="navbar-brand" to="/">
                                    Employee Administration
                                </Link>
                            </NavItem>
                        </Nav>
                        <NavbarToggler onClick={this.toggle}> ></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>

                            {user ? authLinks : guestLinks}

                        </Collapse>

                    </Container>
                </Navbar>
            </div >
        );
    }
}

export default AppNavBar;