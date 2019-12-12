import { profileConstants } from '../_constants';
import { profileService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


export const profileActions = {
    getProfile,
    // update,
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


// function changeProfilePhoto() {
//     return dispatch => {
//         dispatch({
//             type: 'CHANGE_PHOTO'
//         });

//         profileService.getProfileData()
//             .then(
//                 // res => console.log(res)

//                 items => dispatch(success(items.data)),
//                 error => dispatch(failure(error.toString()))
//             );

//     };

// }