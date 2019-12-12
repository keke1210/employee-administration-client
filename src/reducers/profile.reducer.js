import { profileConstants } from '../_constants';

export function profile(state = {}, action) {
    switch (action.type) {
        case profileConstants.GET_PROFILE_DATA_REQUEST:
            return { loading: true };
        case profileConstants.GET_PROFILE_DATA_SUCCESS:
            return action.profileData
        case profileConstants.GET_PROFILE_DATA_FAILURE:
            return {};
        default:
            return state
    }
}