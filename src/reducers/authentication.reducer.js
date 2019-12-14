import { userConstants } from '../_constants';
import { Role } from '../_helpers';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    user: user ? { loggedIn: true, isAdmin: user.role === Role.Administrator, user } : {},
}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}