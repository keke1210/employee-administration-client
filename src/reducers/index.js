import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { profile } from './profile.reducer';

const appReducer = combineReducers({
    /* app’s top-level reducers */
    alert,
    authentication,
    registration,
    profile,
    users
})

const rootReducer = (state, action) => {
    if (action.type === 'USERS_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

// const rootReducer = combineReducers({
//     alert,
//     authentication,
//     registration,
//     profile,
//     users
// });

export default rootReducer;