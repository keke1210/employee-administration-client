import { profileConstants } from '../_constants';
import { profileService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


export const profileActions = {
    getProfile,
    updateProfileData,
    changeProfilePhoto
};


function getProfile() {
    return dispatch => {
        dispatch(request());

        profileService.getProfileData()
            .then(
                // res => console.log(res)

                items => dispatch(success(items.data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: profileConstants.GET_PROFILE_DATA_REQUEST } }
    function success(profileData) { return { type: profileConstants.GET_PROFILE_DATA_SUCCESS, profileData } }
    function failure(error) { return { type: profileConstants.GET_PROFILE_DATA_FAILURE, error } }
}


function updateProfileData(userData) {
    return dispatch => {
        dispatch(request());

        profileService.updateProfile(userData)
            .then(
                items => dispatch(success(items.data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: profileConstants.EDIT_PROFILE_DATA_REQUEST } }
    function success(profileData) { return { type: profileConstants.EDIT_PROFILE_DATA_SUCCESS, profileData } }
    function failure(error) { return { type: profileConstants.EDIT_PROFILE_DATA_FAILURE, error } }
}


function changeProfilePhoto(photo) {
    return dispatch => {
        dispatch(request());
        profileService.updateProfilePicture(photo)
            .then(
                // res => console.log(res)
                res => dispatch(success(res.data)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: profileConstants.CHANGE_PHOTO_REQUEST } }
    function success(photo) { return { type: profileConstants.CHANGE_PHOTO_SUCCESS, photo } }
    function failure(error) { return { type: profileConstants.CHANGE_PHOTO_FAILURE, error } }
}