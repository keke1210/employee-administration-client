import { authHeader } from '../_helpers';
import { history } from '../_helpers'
import axios from 'axios';

export const profileService = {
    getProfileData,
    updateProfile,
    updateProfilePicture
};


function getProfileData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get("https://localhost:44339/api/v1/profile", requestOptions);
}


function updateProfile(userData) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };
    console.log(requestOptions.body)

    return fetch(`https://localhost:44339/api/v1/profile/update/${userData.id}`, requestOptions).then(handleResponse);
}

function updateProfilePicture(photo) {

    return axios.post("https://localhost:44339/api/v1/profile/changePhoto", photo, {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        },
    })
        .then(handleResponse);

}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                history.push('/');
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}