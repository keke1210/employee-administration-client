import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Spinner, Button, Table, Input } from 'reactstrap';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import { history } from '../../_helpers';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { userActions } from '../../actions/user.actions';
import UsersPaginationHelper from './UsersPaginationHelper';


class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            pageSize: 5,
            baseUrl: 'https://localhost:44339/api/v1/users?',
            currentPage: 1
        }

        this.onClickPageLink = this.onClickPageLink.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    onClickNextPage = (uri, next) => {
        return (e) => {
            this.setState({
                currentPage: next === true ? this.state.currentPage + 1 : this.state.currentPage - 1
            });
            this.props.getPrevNextUsers(`${uri}&searchText=${this.state.searchText}`);
        }
    }

    onClickPageLink = (pageNumber) => {
        return (e) => {
            this.setState({
                currentPage: pageNumber
            });

            this.props.getPrevNextUsers(`${this.state.baseUrl}pageNumber=${pageNumber}&pageSize=${this.state.pageSize}&searchText=${this.state.searchText}`);
        }
    }

    onChangeSearchText = (event) => {
        this.setState({
            searchText: [event.target.value],
        });

        this.props.getPrevNextUsers(`${this.state.baseUrl}searchText=${event.target.value}&pageSize=${this.state.pageSize}`);
    }

    onChangeDropDown = (event) => {
        if (typeof (event.target.value) === 'string') {
            this.setState({
                pageSize: [event.target.value],
            });

            this.props.getPrevNextUsers(`${this.state.baseUrl}pageSize=${event.target.value}&pageNumber=${this.state.currentPage}&searchText=${this.state.searchText}`);
        }
    }

    onDoubleClick = (id) => {
        return (e) => {
            history.push(`/users/${id}`);
        }
    }

    render() {
        const { users } = this.props;
        const userData = users && users.items && users.items.data;
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2>Users</h2>
                            <AddUserModal buttonLabel="Edit" />
                        </div>
                        <div className="col">
                            <Input
                                className="col-md-6"
                                style={{ float: "right", marginTop: "4rem" }}
                                type="text" name="searchText"
                                onChange={this.onChangeSearchText}
                                placeholder="Search"
                            />
                        </div>
                    </div>
                </div>


                <Table className="table table-striped" responsive hover>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            {/* <th>Id</th> */}
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {userData && userData.map((user, index) => (
                            <tr key={user.id} onDoubleClick={this.onDoubleClick(user.id)}>
                                <td>{((this.state.currentPage - 1) * this.state.pageSize) + index + 1}</td>
                                {/* <td>{user.id}</td> */}
                                <td >{user.userName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                <td className="tightcell">
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

                <UsersPaginationHelper
                    users={users && users.items}
                    onClickNextPage={this.onClickNextPage(users && users.items && users.items.nextPage, true)}
                    onClickPrevPage={this.onClickNextPage(users && users.items && users.items.previousPage, false)}
                    onClickPageLink={this.onClickPageLink}
                    currentPage={this.state.currentPage}
                />

                <select className="custom-select col-md-3" name="pageSize" onChange={this.onChangeDropDown}>
                    <option value="5">Page Size</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
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