import {call, put, takeLatest} from 'redux-saga/effects'
import {authActionTypes} from "../../action/authActions/authActionTypes";
import {
    loginFailure,
    loginSuccess,
    logoutSuccess,
    signInWithGoogleFailure,
    signInWithGoogleSuccess
} from "../../action/authActions";
import {authApiPaths} from "./authApiPaths";
import {createAccessToken, createAuthToken} from "../../util/AuthToken";

export function* loginHandler(action) {
    const { username, password } = action.payload
    const authToken = createAuthToken(username, password);

    const httpOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: authToken,
        },
    }

    try {
        const response = yield call(fetch, authApiPaths.LDAP_AUTH_FETCH_USER_INFORMATIN_PATH, httpOptions)
        let responseJSON = yield call((res) => res.json(), response)
        if (response.ok) {
            yield put(loginSuccess(responseJSON))
        }
        else {
            yield put(loginFailure(responseJSON))
        }
    }
    catch (error) {
        yield put(loginFailure(error))
    }
}

export function* signInWithGoogleHandler(action) {
    const accessToken = createAccessToken(action.payload)

    const httpOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: accessToken
        }
    }

    try {
        const response = yield call(fetch, authApiPaths.GOOGLE_AUTH_FETCH_USER_INFORMATIN_PATH, httpOptions)
        let responseJSON = yield call((res) => res.json(), response)
        if (response.ok) {
            yield put(signInWithGoogleSuccess(responseJSON))
        }
        else {
            yield put(signInWithGoogleFailure(responseJSON))
        }

    }
    catch (error) {
        yield put(signInWithGoogleFailure(error))
    }
}

export function* logoutHandler() {
    try {
        yield call(fetch, authApiPaths.LOGOUT_REQUEST_PATH, {})
        yield put(logoutSuccess())
    }
    catch (error) {
        yield put(loginFailure(error))
    }
}

export function* authSaga() {
    yield takeLatest(authActionTypes.LOGIN, loginHandler)
    yield takeLatest(authActionTypes.SIGN_IN_WITH_GOOGLE, signInWithGoogleHandler)
    yield takeLatest(authActionTypes.LOGOUT, logoutHandler)
}