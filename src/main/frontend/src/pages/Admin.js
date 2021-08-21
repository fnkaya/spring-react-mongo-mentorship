import TopBar from "../components/TopBar";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import CategoryList from "../components/category";
import AdminDashboard from "../components/admin-dashboard";
import ApplicationDetails from "../components/admin-dashboard/ApplicationDetails";
import MentorList from "../components/admin-dashboard/MentorList";

const Admin = () => {
    let { path } = useRouteMatch();

    return (
        <div>
            <TopBar/>
            <Switch>
                <Route exact path={path} component={AdminDashboard} />
                <Route path={`${path}/applications/:applicationId`} component={ApplicationDetails} />
                <Route path={`${path}/categories`} component={CategoryList} />
                <Route path={`${path}/mentors`} component={MentorList} />
            </Switch>
        </div>
    )
}

export default Admin;