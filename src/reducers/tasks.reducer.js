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
                items: action.tasks,
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
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload]
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
            const itemIndex = state.items.findIndex(user => user.id === action.payload.id)
            const newArray = [
                // destructure all items from beginning to the indexed item
                ...state.items.slice(0, itemIndex),
                // add the updated item to the array
                action.payload,
                // add the rest of the items to the array from the index after the replaced item
                ...state.items.slice(itemIndex + 1)
            ]
            return {
                ...state,
                loading: false,
                items: newArray
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
                items: state.items.map(task =>
                    task.id === action.id
                        ? { ...task, deleting: true }
                        : task
                )
            };
        case tasksConstants.DELETE_SUCCESS:
            return {
                items: state.items.filter(task => task.id !== action.id)
            }
        case tasksConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(task => {
                    if (task.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = task;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return task;
                })
            };
        default:
            return state;
    }
}
