import Home from "./pages/Home";
import 'rsuite/dist/styles/rsuite-default.css';
import './App.css'
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {AdminProtectedRoute} from "./auth/AdminProtectedRoute";
import OAuth2RedirectHandler from "./auth/oauth/OAuth2RedirectHandler";

const App = () => {

  return (
    <div className='font h-100'>
        <BrowserRouter>
            <Switch>
                <AdminProtectedRoute path='/admin' component={Admin} />
                <Route path='/login' component={Login} />
                <Route path='/oauth2/redirect' component={OAuth2RedirectHandler} />
                <Route path='/' component={Home} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
