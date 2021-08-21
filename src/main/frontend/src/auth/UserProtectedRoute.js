import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

export const UserProtectedRoute = ({component: Component, ...rest}) => {
    const { authenticated, principals } = useSelector(state => state.authState.toJS())

    return (
        <Route {...rest} render={props => {
            if (authenticated && principals.role === 'ROLE_USER') {
                return <Component {...props} />
            }
            else {
                return <Redirect to={
                    {
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }
                } />
            }
        }}/>
    )
}