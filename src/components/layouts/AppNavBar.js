import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Container,
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
                <Nav className="mr-auto" navbar>
                    {user && user.role === Role.Administrator &&
                        <Fragment>
                            <NavItem>
                                <Link to="/users" style={{ textDecoration: 'none', color: 'white' }}>Users&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                            </NavItem>
                        </Fragment>
                    }
                    <NavItem>
                        <Link to="/departments" style={{ textDecoration: 'none', color: 'white' }}>Departments&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/projects" style={{ textDecoration: 'none', color: 'white' }}>Projects&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/tasks" style={{ textDecoration: 'none', color: 'white' }}>Tasks&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                    </NavItem>
                </Nav>


                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>{`${user && user.userName}`}&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'grey' }} >Logout</Link>
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
                    </NavItem>
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

                            {user ? authLinks : guestLinks}

                        </Collapse>

                    </Container>
                </Navbar>
            </div >
        );
    }
}

export default AppNavBar;