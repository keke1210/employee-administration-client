import { projectsConstants } from '../_constants';

export function projects(state = {}, action) {
    switch (action.type) {
        case projectsConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case projectsConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.projects,
            }
        case projectsConstants.GETALL_FAILURE:
            return {
                loading: false,
                error: action.error
            };


        case projectsConstants.GETALL_TASKS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case projectsConstants.GETALL_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            }
        case projectsConstants.GETALL_TASKS_FAILURE:
            return {
                loading: false,
                error: action.error
            };


        case projectsConstants.CREATE_PROJECT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case projectsConstants.CREATE_PROJECT_SUCCESS:
            const createdArr = [action.payload, ...state.items.data]
            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    data: createdArr.slice(0, state.items.pageSize)
                }
            }
        case projectsConstants.CREATE_PROJECT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };






        case projectsConstants.UPDATE_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case projectsConstants.UPDATE_PROJECT_SUCCESS:
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
        case projectsConstants.UPDATE_PROJECT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case projectsConstants.DELETE_REQUEST:
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.map(project =>
                        project.id === action.id
                            ? { ...project, deleting: true }
                            : project
                    )
                }
            };
        case projectsConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.filter(project => project.id !== action.id)
                }
            }
        case projectsConstants.DELETE_FAILURE:
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.map(project => {
                        if (project.id === action.id) {
                            // make copy of user without 'deleting:true' property
                            const { deleting, ...userCopy } = project;
                            // return copy of user with 'deleteError:[error]' property
                            return { ...userCopy, deleteError: action.error };
                        }

                        return project;
                    })
                }
            };
        default:
            return state;
    }
}

export function projectsDropDown(state = {}, action) {
    switch (action.type) {
        case projectsConstants.GETALL_PROJECTS_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case projectsConstants.GETALL_PROJECTS_DROPDOWN_SUCCESS:
            return {
                ...state,
                projects: action.projects
            };
        case projectsConstants.GETALL_PROJECTS_DROPDOWN_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}


export function projectById(state = {}, action) {
    switch (action.type) {
        case projectsConstants.GET_PROJECT_REQUESt:
            return {
                ...state,
                loading: true
            }
        case projectsConstants.GET_PROJECT_SUCCESS:
            return action.payload;

        case projectsConstants.GET_PROJECT_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;

    }
}