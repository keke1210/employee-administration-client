import { projectsConstants } from '../_constants';
import { alertActions } from './';
import { projectService } from '../_services'


export const projectActions = {
    createProject,
    updateProject,
    getAll,
    delete: _delete,
    getProjectTasks,
    getPrevNextProjects,
    getAllProjectsDropDown,
    getProjectById
};



function createProject(project) {
    return dispatch => {
        dispatch(request(project));

        projectService.create(project)
            .then(
                project => {
                    dispatch(success(project));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(project) { return { type: projectsConstants.CREATE_PROJECT_REQUEST, project } }
    function success(payload) { return { type: projectsConstants.CREATE_PROJECT_SUCCESS, payload } }
    function failure(error) { return { type: projectsConstants.CREATE_PROJECT_FAILURE, error } }
}


function updateProject(project) {
    return dispatch => {
        dispatch(request(project));

        projectService.update(project)
            .then(
                project => {
                    dispatch(success(project));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(project) { return { type: projectsConstants.UPDATE_PROJECT_REQUEST, project } }
    function success(payload) { return { type: projectsConstants.UPDATE_PROJECT_SUCCESS, payload } }
    function failure(error) { return { type: projectsConstants.UPDATE_PROJECT_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        projectService.getAll()
            .then(
                projects => dispatch(success(projects)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Error: Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: projectsConstants.GETALL_REQUEST } }
    function success(projects) { return { type: projectsConstants.GETALL_SUCCESS, projects } }
    function failure(error) { return { type: projectsConstants.GETALL_FAILURE, error } }
}

function getPrevNextProjects(uri) {
    return dispatch => {
        dispatch(request());

        projectService.getPrevNextProjects(uri)
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: projectsConstants.GETALL_REQUEST } }
    function success(projects) { return { type: projectsConstants.GETALL_SUCCESS, projects } }
    function failure(error) { return { type: projectsConstants.GETALL_FAILURE, error } }
}


function getAllProjectsDropDown() {
    return dispatch => {
        dispatch(request());

        projectService.getAllProjectsDropDown()
            .then(
                projects => dispatch(success(projects)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Error: Failed to fetch the data!"));
                }
            );
    }

    function request() { return { type: projectsConstants.GETALL_PROJECTS_DROPDOWN_REQUEST } }
    function success(projects) { return { type: projectsConstants.GETALL_PROJECTS_DROPDOWN_SUCCESS, projects } }
    function failure(error) { return { type: projectsConstants.GETALL_PROJECTS_DROPDOWN_FAILURE, error } }
}

function getProjectTasks(id) {
    return dispatch => {
        dispatch(request());

        projectService.getProjectsTasks(id)
            .then(
                projects => dispatch(success(projects)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Error: Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: projectsConstants.GETALL_TASKS_REQUEST } }
    function success(payload) { return { type: projectsConstants.GETALL_TASKS_SUCCESS, payload } }
    function failure(error) { return { type: projectsConstants.GETALL_TASKS_FAILURE, error } }
}


function getProjectById(id) {
    return dispatch => {
        dispatch(request());

        projectService.getById(id)
            .then(
                project => dispatch(success(project)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Error: Failed to fetch the data!"));
                }
            );
    };

    function request() { return { type: projectsConstants.GET_PROJECT_REQUEST } }
    function success(payload) { return { type: projectsConstants.GET_PROJECT_SUCCESS, payload } }
    function failure(error) { return { type: projectsConstants.GET_PROJECT_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        projectService.delete(id)
            .then(
                project => dispatch(success(id)),
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request(id) { return { type: projectsConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: projectsConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: projectsConstants.DELETE_FAILURE, id, error } }
}