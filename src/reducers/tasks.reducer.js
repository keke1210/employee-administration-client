import { tasksConstants } from '../_constants';

export function tasks(state = {}, action) {
    switch (action.type) {
        case tasksConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case tasksConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.tasks
            }
        case tasksConstants.GETALL_FAILURE:
            return {
                loading: false,
                error: action.error
            };



        case tasksConstants.CREATE_TASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case tasksConstants.CREATE_TASK_SUCCESS:
            const createdArr = [
                action.payload, ...state.items.data
            ]
            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    data: createdArr.slice(0, state.items.pageSize)
                }
            }
        case tasksConstants.CREATE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case tasksConstants.UPDATE_TASK_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case tasksConstants.UPDATE_TASK_SUCCESS:
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
        case tasksConstants.UPDATE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };




        case tasksConstants.COMPLETE_TASK_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case tasksConstants.COMPLETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                task: action.payload
            };
        case tasksConstants.COMPLETE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case tasksConstants.DELETE_REQUEST:
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.map(task =>
                        task.id === action.id
                            ? { ...task, deleting: true }
                            : task
                    )
                }
            };
        case tasksConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.filter(task => task.id !== action.id)
                }
            }
        case tasksConstants.DELETE_FAILURE:
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.map(task => {
                        if (task.id === action.id) {
                            // make copy of user without 'deleting:true' property
                            const { deleting, ...userCopy } = task;
                            // return copy of user with 'deleteError:[error]' property
                            return { ...userCopy, deleteError: action.error };
                        }

                        return task;
                    })
                }
            };
        default:
            return state;
    }
}

export function showTask(state = {}, action) {
    switch (action.type) {

        case tasksConstants.GET_TASK_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case tasksConstants.GET_TASK_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                task: action.task
            };
        case tasksConstants.GET_TASK_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}



export function userTasksDropDown(state = {}, action) {
    switch (action.type) {
        case tasksConstants.GET_USER_TASKS_DP_REQUEST:
            return {
                ...state,
                loading: true
            };
        case tasksConstants.GET_USER_TASKS_DP_SUCCESS:
            return {
                ...state,
                users: action.tasks
            };
        case tasksConstants.GET_USER_TASKS_DP_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}


export function userTasks(state = {}, action) {
    switch (action.type) {
        case tasksConstants.GET_USER_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case tasksConstants.GET_USER_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                userTasks: action.userTasks
            };
        case tasksConstants.GET_USER_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case tasksConstants.ADD_TASK_TO_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case tasksConstants.ADD_TASK_TO_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userTasks: [...state.userTasks, action.userTasks]
            };
        case tasksConstants.ADD_TASK_TO_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case tasksConstants.REMOVE_TASK_FROM_USER_REQUEST:
            return {
                ...state,
                userTasks: state.userTasks.map(user =>
                    user.id === action.userId
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case tasksConstants.REMOVE_TASK_FROM_USER_SUCCESS:
            return {
                ...state,
                userTasks: state.userTasks.filter(user => user.id !== action.userId)
            };
        case tasksConstants.REMOVE_TASK_FROM_USER_FAILURE:
            return {
                ...state,
                userTasks: state.userTasks.map(user => {
                    if (user.id === action.userId) {
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