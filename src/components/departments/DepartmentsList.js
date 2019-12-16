import React, { Component, Fragment } from 'react';
import { Table, Col, Spinner, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux';
import { departmentActions } from '../../actions';
import AddDepartmentModal from './AddDepartmentModal'
import EditDepatmentModal from './EditDepatmentModal';


export class DepartmentsList extends Component {
    componentDidMount() {
        this.props.getDepartments();
    }

    handleDeleteDepartment = (id) => {
        return (e) => this.props.deleteDepartment(id);
    }

    render() {

        const { departments } = this.props;
        console.log(departments);

        return (
            <Fragment>
                <h2>Departments</h2>
                <AddDepartmentModal />
                <Table className="table table-striped" responsive hover striped>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            <th>Id</th>
                            <th>Departent Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments && departments.items && departments.items.map((department, index) =>
                            (
                                <tr key={department.id}>
                                    <td>{index + 1}</td>
                                    <td>{department.id}</td>
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

            </Fragment>

        )
    }
}

const mapStateToProps = state => ({
    departments: state.departments
});

const actionCreators = {
    getDepartments: departmentActions.getAll,
    deleteDepartment: departmentActions.delete
}

export default connect(mapStateToProps, actionCreators)(DepartmentsList);
