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
                items: [...state.items, action.payload]
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
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}