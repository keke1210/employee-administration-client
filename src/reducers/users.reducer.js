import { userConstants } from '../_constants';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.users,
            }
        case userConstants.GETALL_FAILURE:
            return {
                loading: false,
                error: action.error
            };


        case userConstants.CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    data: [action.payload, ...state.items.data]
                }
            };
        case userConstants.CREATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };


        case userConstants.UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.UPDATE_USER_SUCCESS:
            const itemIndex = state.items.data.findIndex(user => user.id === action.payload.id)
            const newArray = [
                // destructure all items from beginning to the indexed item
                ...state.items.data.slice(0, itemIndex),
                // add the updated item to the array
                action.payload,
                // add the rest of the items to the array from the index after the replaced item
                ...state.items.data.slice(itemIndex + 1)
            ]
            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    data: newArray
                }
            };
        case userConstants.UPDATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case userConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.map(user =>
                        user.id === action.id
                            ? { ...user, deleting: true }
                            : user
                    )
                }
            };
        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.filter(user => user.id !== action.id)
                }
            };
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.map(user => {
                        if (user.id === action.id) {
                            // make copy of user without 'deleting:true' property
                            const { deleting, ...userCopy } = user;
                            // return copy of user with 'deleteError:[error]' property
                            return { ...userCopy, deleteError: action.error };
                        }

                        return user;
                    })
                }
            };

        default:
            return state
    }
}


export function showUser(state = {}, action) {
    switch (action.type) {

        case userConstants.GET_USER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user
            };
        case userConstants.GET_USER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function userProjects(state = {}, action) {
    switch (action.type) {

        case userConstants.GET_USER_PROJECTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.GET_USER_PROJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                userProjects: action.userProjects
            };
        case userConstants.GET_USER_PROJECTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case userConstants.ADD_PROJECT_TO_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.ADD_PROJECT_TO_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userProjects: [...state.userProjects, action.userProjects]
            };
        case userConstants.ADD_PROJECT_TO_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case userConstants.REMOVE_PROJECT_FROM_USER_REQUEST:
            return {
                ...state,
                userProjects: state.userProjects.map(project =>
                    project.id === action.projectId
                        ? { ...project, deleting: true }
                        : project
                )
            };
        case userConstants.REMOVE_PROJECT_FROM_USER_SUCCESS:
            return {
                ...state,
                userProjects: state.userProjects.filter(project => project.id !== action.projectId)
            };
        case userConstants.REMOVE_PROJECT_FROM_USER_FAILURE:
            return {
                ...state,
                userProjects: state.userProjects.map(user => {
                    if (user.id === action.projectId) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                }),

                error: action.error
            };

        default:
            return state;
    }
}