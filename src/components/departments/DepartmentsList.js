import React, { Component, Fragment } from 'react';
import { Table, Col, Spinner, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux';
import { departmentActions } from '../../actions';
import AddDepartmentModal from './AddDepartmentModal'
import EditDepatmentModal from './EditDepatmentModal';
import DepartmentsPaginationHelper from './DepartmentsPaginationHelper'

export class DepartmentsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            pageSize: 5,
            baseUrl: 'https://localhost:44339/api/v1/departments/getall?',
            currentPage: 1
        }

        this.onClickPageLink = this.onClickPageLink.bind(this);
    }

    componentDidMount() {
        this.props.getDepartments();
    }

    handleDeleteDepartment = (id) => {
        return (e) => this.props.deleteDepartment(id);
    }

    onClickNextPage = (uri, next) => {
        return (e) => {
            this.setState({
                currentPage: next === true ? this.state.currentPage + 1 : this.state.currentPage - 1
            });
            this.props.getPrevNextDepartments(`${uri}&searchText=${this.state.searchText}`);
        }
    }

    onClickPageLink = (pageNumber) => {
        return (e) => {
            this.setState({
                currentPage: pageNumber
            });

            this.props.getPrevNextDepartments(`${this.state.baseUrl}pageNumber=${pageNumber}&pageSize=${this.state.pageSize}&searchText=${this.state.searchText}`);
        }
    }

    onChangeSearchText = (event) => {
        this.setState({
            searchText: [event.target.value],
        });

        this.props.getPrevNextDepartments(`${this.state.baseUrl}searchText=${event.target.value}&pageSize=${this.state.pageSize}`);
    }

    onChangeDropDown = (event) => {
        this.setState({
            pageSize: [event.target.value],
        });
        this.props.getPrevNextDepartments(`${this.state.baseUrl}pageSize=${event.target.value}&pageNumber=${this.state.currentPage}&searchText=${this.state.searchText}`);
    }



    render() {
        const { departments } = this.props;
        console.log(departments);

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <h2>Departments</h2>
                            <AddDepartmentModal />
                        </Col>
                        <Col>
                            <Input
                                className="col-md-6"
                                style={{ float: "right", marginTop: "4rem" }}
                                type="text" name="searchText"
                                onChange={this.onChangeSearchText}
                                placeholder="Search"
                            />
                        </Col>
                    </Row>
                </Container>

                <Table className="table table-striped" responsive hover striped>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            {/* <th>Id</th> */}
                            <th>Departent Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments && departments.items && departments.items && departments.items.data
                            && departments.items.data.map((department, index) =>
                                (
                                    <tr key={department.id}>
                                        <td>{((this.state.currentPage - 1) * this.state.pageSize) + index + 1}</td>
                                        {/* <td>{department.id}</td> */}
                                        <td>{department.departmentName}</td>
                                        <td className="tightcell">
                                            {' '}
                                            <EditDepatmentModal department={department} /> &nbsp;
                                        <Button className="btn btn-danger btn-sm" onClick={this.handleDeleteDepartment(department.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}

                    </tbody>

                </Table>
                {departments.loading && <Spinner type="grow" color="dark" />}

                <DepartmentsPaginationHelper departments={departments && departments.items}
                    onClickNextPage={this.onClickNextPage(departments && departments.items && departments.items.nextPage, true)}
                    onClickPrevPage={this.onClickNextPage(departments && departments.items && departments.items.previousPage, false)}
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

            </Fragment>

        )
    }
}

const mapStateToProps = state => ({
    departments: state.departments
});

const actionCreators = {
    getDepartments: departmentActions.getAll,
    deleteDepartment: departmentActions.delete,
    getPrevNextDepartments: departmentActions.getPrevNextDepartments
}

export default connect(mapStateToProps, actionCreators)(DepartmentsList);
