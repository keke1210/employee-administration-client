import axios from 'axios';
import { returnErrors } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from './types';


//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    // GET token from state
    const token = getState().auth.token;

    // HEADERS 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorize'] = `Bearer ${token}`;
    }

    axios.get('https://localhost:44339/api/v1/auth/user/', config)
        .then(res => {

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {

            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })

}




//LOGIN USER
export const login = (userName, password) => (dispatch, getState) => {
    // HEADERS 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }


    //Requset body
    const body = JSON.stringify({ userName, password });

    axios.post('https://localhost:44339/api/v1/auth/login/', body, config)
        .then(res => {
            console.log(res)

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.user
            })
        }).catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        })

}


// LOG OUT USER
export const logout = () => (dispatch, getState) => {
    // GET token from state
    const token = getState().auth.token;

    // HEADERS 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorize'] = `Bearer ${token}`;
    }


    axios.post('https://localhost:44339/api/v1/auth/logout/', null, config)
        .then(res => {

            dispatch({
                type: LOGOUT_SUCCESS,
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })

}
