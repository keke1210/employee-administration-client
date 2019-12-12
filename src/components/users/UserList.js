import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { userActions } from '../../actions/user.actions';

class UserList extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { users } = this.props;
        return (
            <Fragment>
                <h2>Users</h2>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add user</Button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Role</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {users.loading && <em>Loading users...</em>} */}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.items && users.items.map((user, index) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-info btn-sm">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={this.handleDeleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <h1>Hi {user.userName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                            : <span> - <button onClick={this.handleDeleteUser(user.id)}>Delete</button></span>
                                }
                            </li>
                        )}
                    </ul>
                } */}
            </Fragment>



        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(UserList);
export { connectedHomePage as UserList };