import { authHeader, history } from '../_helpers';

export const projectService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete,
    getProjectsTasks,
    getPrevNextProjects
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/projects/getall`, requestOptions).then(handleResponse);
}

function getPrevNextProjects(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    if (!url) {
        return fetch(`https://localhost:44339/api/v1/projects/getall`, requestOptions).then(handleResponse);
    }
    return fetch(url, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/projects/${id}`, requestOptions).then(handleResponse);
}

function getProjectsTasks(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/tasks/getProjectTasks/${id}`, requestOptions).then(handleResponse);
}

function create(project) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    };

    return fetch(`https://localhost:44339/api/v1/projects/create`, requestOptions).then(handleResponse);
}

function update(project) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    };

    return fetch(`https://localhost:44339/api/v1/projects/update/${project.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/projects/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // history.push('/login');
                // window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}