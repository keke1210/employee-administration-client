import { authHeader } from '../_helpers';
import axios from 'axios';

export const profileService = {
    getProfileData
};


function getProfileData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get("https://localhost:44339/api/v1/profile", requestOptions);
}