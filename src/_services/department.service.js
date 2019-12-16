import { authHeader, history } from '../_helpers';

export const departmentService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/departments/getall`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/departments/${id}`, requestOptions).then(handleResponse);
}

function create(departmentRequest) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(departmentRequest)
    };

    return fetch(`https://localhost:44339/api/v1/departments/create`, requestOptions).then(handleResponse);
}

function update(departmentRequest) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(departmentRequest)
    };

    return fetch(`https://localhost:44339/api/v1/departments/update/${departmentRequest.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`https://localhost:44339/api/v1/departments/delete/${id}`, requestOptions).then(handleResponse);
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