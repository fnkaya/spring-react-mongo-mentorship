import { BASE_URL } from "../../util/apiCall/ApiBaseUrl";

const authApiPaths = {
    LDAP_AUTH_FETCH_USER_INFORMATIN_PATH: `${BASE_URL}/api/accounts/ldap`,
    GOOGLE_AUTH_FETCH_USER_INFORMATIN_PATH: `${BASE_URL}/api/accounts/google`,
    LOGOUT_REQUEST_PATH: `${BASE_URL}/logout`
}

export { authApiPaths }