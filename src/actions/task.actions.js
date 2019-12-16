import { tasksConstants } from '../_constants';
import { alertActions } from './';
import { taskServices } from '../_services'


export const taskActions = {
    createTask,
    updateTask,
    getAll,
    delete: _delete,
    markTaskAsCompleted
};



function createTask(task) {
    return dispatch => {
        dispatch(request(task));

        taskServices.create(task)
            .then(
                project => {
                    dispatch(success(task));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(task) { return { type: tasksConstants.CREATE_TASK_REQUEST, task } }
    function success(payload) { return { type: tasksConstants.CREATE_TASK_SUCCESS, payload } }
    function failure(error) { return { type: tasksConstants.CREATE_TASK_FAILURE, error } }
}


function updateTask(task) {
    return dispatch => {
        dispatch(request(task));

        taskServices.update(task)
            .then(
                task => {
                    dispatch(success(task));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(task) { return { type: tasksConstants.UPDATE_TASK_REQUEST, task } }
    function success(payload) { return { type: tasksConstants.UPDATE_TASK_SUCCESS, payload } }
    function failure(error) { return { type: tasksConstants.UPDATE_TASK_FAILURE, error } }
}

function markTaskAsCompleted(id, completed) {
    return dispatch => {
        dispatch(request());

        taskServices.markTaskAsCompleted(id, completed)
            .then(
                task => {
                    dispatch(success(task));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(task) { return { type: tasksConstants.COMPLETE_TASK_REQUEST, task } }
    function success(payload) { return { type: tasksConstants.COMPLETE_TASK_SUCCESS, payload } }
    function failure(error) { return { type: tasksConstants.COMPLETE_TASK_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        taskServices.getAll()
            .then(
                tasks => dispatch(success(tasks)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Error: Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: tasksConstants.GETALL_REQUEST } }
    function success(tasks) { return { type: tasksConstants.GETALL_SUCCESS, tasks } }
    function failure(error) { return { type: tasksConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        taskServices.delete(id)
            .then(
                project => dispatch(success(id)),
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request(id) { return { type: tasksConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: tasksConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: tasksConstants.DELETE_FAILURE, id, error } }
}