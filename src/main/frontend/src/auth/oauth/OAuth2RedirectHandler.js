import { ACCESS_TOKEN } from './OAuth2Constants';
import { Redirect } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {signInWithGoogle, signInWithGoogleFailure} from "../../action/authActions";

const OAuth2RedirectHandler = (props) => {
    const dispatch = useDispatch();

    const getUrlParameter = (param) => {
        param = param.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + param + '=([^&#]*)');

        const results = regex.exec(props.location.search);
        return results === null
            ? ''
            : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        dispatch(signInWithGoogle(token))

        return (
            <Redirect
                to={{
                    pathname: '/',
                    state: { from: props.location },
                }}
            />
        );
    } else {
        dispatch(signInWithGoogleFailure(error))

        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: {
                        form: props.location,
                        error: error,
                    },
                }}
            />
        );
    }
};

export default OAuth2RedirectHandler;
