import handleAuthRedirect from './handleAuthRedirect';

const authenticate_user = (state, history, dispatch) => { // abstracted this out because I also need in my register action
    const body = JSON.stringify(state)
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    }
    dispatch({type: 'AUTH_REQUEST'})
    fetch(`http://localhost:3001/authenticate`, options)
        .then(resp => resp.json())
        .then(json => {
            console.log("in loginUser action", json);
            if (json.user) {
                dispatch({type: 'AUTH_SUCCESS', user: json.user})
                localStorage.setItem("token", json.auth_token);
                history.push(`/rooms`);
            } else if (json.errors) {
                dispatch({type: 'AUTH_FAIL'});
                dispatch({type: 'ADD_ERRORS', errors: json.errors })
            }
        })
}

export const loginUser = (state, history) => {
    return dispatch => {
        authenticate_user(state, history, dispatch)
    }
}

export const setLogin = history => {
    return dispatch => {
        const token = localStorage.getItem("token");
        console.log('in setlogin');
        if (token) {
            dispatch({type: 'AUTH_REQUEST'});
            fetch(`http://localhost:3001/set_login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log("in setLogin action", json);
                    if (json.user) {
                        dispatch({type: 'AUTH_SUCCESS', user: json.user})
                        
                        handleAuthRedirect(true, history);  // created function to control for different routes for redirects
                    } else if (json.error) {
                        dispatch({type: 'AUTH_FAIL'});
                        handleAuthRedirect(false, history);
                    }
                })
        } else {
            handleAuthRedirect(false, history)
        }
    }
}

export const logOut = history => {
    // I don't need to send anything to database.
    return dispatch => {
        localStorage.clear();
        dispatch({type: 'LOGOUT'})
        history.push(`/login`);
    }
}

export const clearErrors = () => {
    return dispatch => {
        dispatch({type: 'CLEAR_ERRORS'});
    }
}

export const register = (state, history) => {
    return dispatch => {
        const body = JSON.stringify(state);
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }
        fetch(`http://localhost:3001/users`, options)
            .then(resp => resp.json())
            .then(json => {
                console.log("in register action ", json);
                if (json.user) {
                    authenticate_user(state, history, dispatch);
                } else {
                    dispatch({type: 'ADD_ERRORS', errors: json.errors })
                }
            })
    }
}