import { fromJS } from "immutable";
import { authActionTypes } from "../../action/authActions/authActionTypes";

let principals = localStorage.getItem("principals");
const authenticated = !!principals;
const authenticatedUserPrincipals = principals ? JSON.parse(principals) : undefined;

const initialState = fromJS({
    pending: false,
    authenticated: authenticated,
    principals: authenticatedUserPrincipals,
    error: undefined
});

const authReducer = (state = initialState, {type, payload, error}) => {
    switch (type) {
        case authActionTypes.LOGIN:
            return state.merge({pending: true, error: undefined})

        case authActionTypes.LOGIN_SUCCESS:
            localStorage.setItem("principals", JSON.stringify(payload))
            return state.merge({pending: false, authenticated:true, principals: payload})

        case authActionTypes.LOGIN_FAILURE:
            return state.merge({pending: false, error})

        case authActionTypes.SIGN_IN_WITH_GOOGLE:
            return state.merge({pending: true, error: undefined})

        case authActionTypes.SIGN_IN_WITH_GOOGLE_SUCCESS:
            localStorage.setItem("principals", JSON.stringify(payload))
            return state.merge({pending: false, authenticated:true, principals: payload})

        case authActionTypes.SIGN_IN_WITH_GOOGLE_FAILURE:
            return state.merge({pending: false, error})

        case authActionTypes.LOGOUT:
            return state.merge({pending: true, error: undefined})

        case authActionTypes.LOGOUT_SUCCESS:
            localStorage.removeItem("principals")
            if (localStorage.getItem("accessToken")) {
                localStorage.removeItem("accessToken")
            }
            return state.merge({pending: false, authenticated: false, principals: undefined})

        case authActionTypes.LOGOUT_FAILURE:
            return state.merge({pending: false, error})

        default:
            return state
    }
}

export default authReducer