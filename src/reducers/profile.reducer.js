import { profileConstants } from '../_constants';

export function profile(state = {}, action) {
    switch (action.type) {

        case profileConstants.GET_PROFILE_DATA_REQUEST:
            return { ...state, loading: true };
        case profileConstants.GET_PROFILE_DATA_SUCCESS:
            return { ...state, loading: false, profileData: action.profileData };
        case profileConstants.GET_PROFILE_DATA_FAILURE:
            return { ...state };


        case profileConstants.EDIT_PROFILE_DATA_REQUEST:
            return { ...state, loading: true };

        case profileConstants.EDIT_PROFILE_DATA_SUCCESS:
            return { ...state, loading: false };

        case profileConstants.EDIT_PROFILE_DATA_FAILURE:
            return { ...state };


        case profileConstants.CHANGE_PHOTO_REQUEST:
            return { ...state, loading: true };

        case profileConstants.CHANGE_PHOTO_SUCCESS:
            return { ...state, loading: false };

        case profileConstants.CHANGE_PHOTO_FAILURE:
            return { ...state };

        default:
            return state
    }
}