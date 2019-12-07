import axios from 'axios';
import { createMessage } from './messages';

import { GET_TASKS, DELETE_TASK, ADD_TASK, GET_ERRORS } from './types';

// GET TASKS
export const getTasks = () => dispatch => {
    axios
        .get("https://localhost:44339/api/v1/tasks")
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_TASKS,
                payload: res.data
            })
        }).catch(err => console.log(err.response.data));
}


// DELETE TASK
export const deleteTask = (id) => dispatch => {
    axios
        .delete(`https://localhost:44339/api/v1/tasks/delete/${id}`)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        }).catch(err => console.log(err));
}


// ADD TASK
export const addTask = (task) => dispatch => {
    axios
        .post(`https://localhost:44339/api/v1/tasks/create`, task)
        .then(res => {
            dispatch(createMessage({ taskAdded: "Task Added" }));
            dispatch({
                type: ADD_TASK,
                payload: res.data
            })
        }).catch(err => {
            const errors = {
                msg: err.response.data.errors,
                status: err.response.status
            }

            dispatch({
                type: GET_ERRORS,
                payload: errors
            });
        });


}