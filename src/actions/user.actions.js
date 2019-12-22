import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    createUser,
    updateUser,
    delete: _delete,
    getPrevNextUsers,
    getUserById,
    getUserProjects,
    addUserProject,
    removeUserProject
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/profile');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function createUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.createUser(user)
            .then(
                user => {
                    dispatch(addUser(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.CREATE_USER_REQUEST, user } }
    function addUser(payload) { return { type: userConstants.CREATE_USER_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.CREATE_USER_FAILURE, error } }
}


function updateUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_USER_REQUEST, user } }
    function success(payload) { return { type: userConstants.UPDATE_USER_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.UPDATE_USER_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}



function getUserById(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: userConstants.GET_USER_BY_ID_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_BY_ID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_BY_ID_FAILURE, error } }
}

function getUserProjects(id) {
    return dispatch => {
        dispatch(request());

        userService.getUserProjects(id)
            .then(
                userProjects => dispatch(success(userProjects)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: userConstants.GET_USER_PROJECTS_REQUEST } }
    function success(userProjects) { return { type: userConstants.GET_USER_PROJECTS_SUCCESS, userProjects } }
    function failure(error) { return { type: userConstants.GET_USER_PROJECTS_FAILURE, error } }
}


function addUserProject(userId, projectId) {
    return dispatch => {
        dispatch(request());

        userService.addUserProject(userId, projectId)
            .then(
                userProjects => {
                    dispatch(success(userProjects));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.ADD_PROJECT_TO_USER_REQUEST } }
    function success(userProjects) { return { type: userConstants.ADD_PROJECT_TO_USER_SUCCESS, userProjects } }
    function failure(error) { return { type: userConstants.ADD_PROJECT_TO_USER_FAILURE, error } }
}


function removeUserProject(userId, projectId) {
    return dispatch => {
        dispatch(request(projectId));

        userService.removeUserProject(userId, projectId)
            .then(
                userProjects => {
                    dispatch(success(projectId));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(projectId) { return { type: userConstants.REMOVE_PROJECT_FROM_USER_REQUEST, projectId } }
    function success(projectId) { return { type: userConstants.REMOVE_PROJECT_FROM_USER_SUCCESS, projectId } }
    function failure(projectId, error) { return { type: userConstants.REMOVE_PROJECT_FROM_USER_FAILURE, projectId, error } }
}

function getPrevNextUsers(uri) {
    return dispatch => {
        dispatch(request());

        userService.getPrevNextUsers(uri)
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}



// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}