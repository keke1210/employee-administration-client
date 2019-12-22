import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users, showUser, userProjects } from './users.reducer';
import { alert } from './alert.reducer';
import { profile } from './profile.reducer';
import { departments, departmentsDropDown } from './department.reducer';
import { projects, projectsDropDown } from './projects.reducer';
import { tasks } from './tasks.reducer';

const appReducer = combineReducers({
    /* app’s top-level reducers */
    alert,
    authentication,
    registration,
    profile,
    users,
    departments,
    projects,
    tasks,
    departmentsDropDown,
    projectsDropDown,
    showUser,
    userProjects
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