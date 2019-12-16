import { departmentsConstants } from '../_constants';
import { alertActions } from './';
import { departmentService } from '../_services'


export const departmentActions = {
    createDepartment,
    updateDepartment,
    getAll,
    delete: _delete
};



function createDepartment(department) {
    return dispatch => {
        dispatch(request(department));

        departmentService.create(department)
            .then(
                department => {
                    dispatch(addDepartment(department));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(department) { return { type: departmentsConstants.CREATE_DEPARTMENT_REQUEST, department } }
    function addDepartment(payload) { return { type: departmentsConstants.CREATE_DEPARTMENT_SUCCESS, payload } }
    function failure(error) { return { type: departmentsConstants.CREATE_DEPARTMENT_FAILURE, error } }
}


function updateDepartment(department) {
    return dispatch => {
        dispatch(request(department));

        departmentService.update(department)
            .then(
                department => {
                    dispatch(success(department));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(department) { return { type: departmentsConstants.UPDATE_DEPARTMENT_REQUEST, department } }
    function success(payload) { return { type: departmentsConstants.UPDATE_DEPARTMENT_SUCCESS, payload } }
    function failure(error) { return { type: departmentsConstants.UPDATE_DEPARTMENT_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        departmentService.getAll()
            .then(
                departments => dispatch(success(departments)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Error: Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: departmentsConstants.GETALL_REQUEST } }
    function success(departments) { return { type: departmentsConstants.GETALL_SUCCESS, departments } }
    function failure(error) { return { type: departmentsConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        departmentService.delete(id)
            .then(
                department => dispatch(success(id)),
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request(id) { return { type: departmentsConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: departmentsConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: departmentsConstants.DELETE_FAILURE, id, error } }
}