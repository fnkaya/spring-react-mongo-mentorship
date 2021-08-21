import { authActionTypes } from "./authActionTypes";

export const loginRequest = (credentials) => ({
    type: authActionTypes.LOGIN,
    payload: credentials
})

export const loginSuccess = (principals) => ({
    type: authActionTypes.LOGIN_SUCCESS,
    payload: principals
})

export const loginFailure = (error) => ({
    type: authActionTypes.LOGIN_FAILURE,
    error
})

export const signInWithGoogle = (accessToken) => ({
    type: authActionTypes.SIGN_IN_WITH_GOOGLE,
    payload: accessToken
})

export const signInWithGoogleSuccess = (principals) => ({
    type: authActionTypes.SIGN_IN_WITH_GOOGLE_SUCCESS,
    payload: principals
})

export const signInWithGoogleFailure = (error) => ({
    type: authActionTypes.SIGN_IN_WITH_GOOGLE_FAILURE,
    error
})

export const logoutRequest = () => ({
    type: authActionTypes.LOGOUT
})

export const logoutSuccess = () => ({
    type: authActionTypes.LOGOUT_SUCCESS
})

export const logoutFailure = (error) => ({
    type: authActionTypes.LOGOUT_FAILURE,
    error
})