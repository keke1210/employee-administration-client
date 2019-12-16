import { departmentsConstants } from '../_constants';

export function departments(state = {}, action) {
    switch (action.type) {
        case departmentsConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case departmentsConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.departments,
            }
        case departmentsConstants.GETALL_FAILURE:
            return {
                loading: false,
                error: action.error
            };



        case departmentsConstants.CREATE_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case departmentsConstants.CREATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload]
            }
        case departmentsConstants.CREATE_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case departmentsConstants.UPDATE_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case departmentsConstants.UPDATE_DEPARTMENT_SUCCESS:
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
        case departmentsConstants.UPDATE_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };



        case departmentsConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(department =>
                    department.id === action.id
                        ? { ...department, deleting: true }
                        : department
                )
            };
        case departmentsConstants.DELETE_SUCCESS:
            return {
                items: state.items.filter(department => department.id !== action.id)
            }
        case departmentsConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(department => {
                    if (department.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = department;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return department;
                })
            };
        default:
            return state;
    }
}
