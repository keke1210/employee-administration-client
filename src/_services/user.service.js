import { authHeader, history } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    createUser,
    getAll,
    getById,
    update,
    delete: _delete,
    getPrevNextUsers,
    getUserProjects,
    addUserProject,
    removeUserProject
};

// const currentUser = JSON.parse(localStorage.getItem('user'));

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`https://localhost:44339/api/v1/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/users`, requestOptions).then(handleResponse);
}

function getPrevNextUsers(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    if (!url) {
        return fetch(`https://localhost:44339/api/v1/users`, requestOptions).then(handleResponse);
    }
    return fetch(url, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/users/${id}`, requestOptions).then(handleResponse);
}

function getUserProjects(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/users/${id}/projects`, requestOptions).then(handleResponse);
}

function addUserProject(userId, projectId) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
    };

    return fetch(`https://localhost:44339/api/v1/users/createUserProjects?userId=${userId}&projectId=${projectId}`, requestOptions).then(handleResponse);
}

function removeUserProject(userId, projectId) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
    };

    return fetch(`https://localhost:44339/api/v1/users/removeUserProjects?userId=${userId}&projectId=${projectId}`, requestOptions).then(handleResponse);
}

function createUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`https://localhost:44339/api/v1/users/createUser`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`https://localhost:44339/api/v1/auth/register`, requestOptions).then(handleResponse);
}



function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`https://localhost:44339/api/v1/users/update/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/users/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}