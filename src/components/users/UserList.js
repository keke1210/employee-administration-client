import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Spinner, Button, Table } from 'reactstrap';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { userActions } from '../../actions/user.actions';
// import PaginationFooter from '../../components/common/PaginationFooter';

class UserList extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { users } = this.props;
        console.log(users);
        return (
            <Fragment>
                <h2>Users</h2>
                <AddUserModal buttonLabel="Edit" />
                {/* <EditUserModal /> */}
                <Table className="table table-striped" responsive hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {users && users.items && users.items.map((user, index) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button color="info" className="btn-sm" >
                                        <FontAwesomeIcon icon={faPen} />
                                    </Button>
                                    &nbsp;
                                    <Button className="btn btn-danger btn-sm" onClick={this.handleDeleteUser(user.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {users.loading && <Spinner type="grow" color="dark" />}
                {/* <PaginationFooter items={users} /> */}
            </Fragment >



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