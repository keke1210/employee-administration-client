import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Spinner, Button, Table, Pagination } from 'reactstrap';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { userActions } from '../../actions/user.actions';
//  import PaginationFooter from '../../components/common/PaginationFooter';
import PaginationHelper from '../../components/layouts/PaginationHelper';


class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.onClickPageLink = this.onClickPageLink.bind(this);
        this.onClickNextPage = this.onClickNextPage.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    onClickNextPage(uri) {

        return (e) => this.props.getPrevNextUsers(uri);
    }

    onClickPageLink(pageNumber) {
        return (e) => this.props.getPrevNextUsers(`https://localhost:44339/api/v1/users?pageNumber=${pageNumber}`);
    }


    render() {
        const { users } = this.props;
        // const newUsers = users.data;
        console.log(users);
        return (
            <Fragment>
                <h2>Users</h2>
                <AddUserModal buttonLabel="Edit" />
                {/* <EditUserModal /> */}
                <Table className="table table-striped" responsive hover>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            <th>Id</th>
                            <th>Username</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {users && users.items && users.items.data && users.items.data.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.id}</td>
                                <td >{user.userName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                <td className="tightcell">
                                    {/* <Button color="info" className="btn-sm" >
                                        <FontAwesomeIcon icon={faPen} />
                                    </Button> */}
                                    <EditUserModal user={user} />
                                    {' '}
                                    <Button className="btn btn-danger btn-sm" onClick={this.handleDeleteUser(user.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {users.loading && <Spinner type="grow" color="dark" />}
                <PaginationHelper users={users && users.items}
                    onClickNextPage={this.onClickNextPage(users && users.items && users.items.nextPage)}
                    onClickPrevPage={this.onClickNextPage(users && users.items && users.items.previousPage)}
                    onClickPageLink={this.onClickPageLink}
                />
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
    getPrevNextUsers: userActions.getPrevNextUsers,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(UserList);
export { connectedHomePage as UserList };