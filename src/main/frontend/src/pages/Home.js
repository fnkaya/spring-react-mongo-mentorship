import {Route, Switch, useRouteMatch} from "react-router-dom";
import ApplicationForm from "../components/application/ApplictionForm";
import Search from "../components/post";
import TopBar from "../components/TopBar";
import UserDashboard from "../components/user-dashboard";
import PostDetails from "../components/post/PostDetails";
import MentorshipDetails from "../components/user-dashboard/MentorshipDetails";
import NotFound from "../components/NotFound";
import {UserProtectedRoute} from "../auth/UserProtectedRoute";
import CreatePhase from "../components/user-dashboard/CreatePhase";
import Applications from "../components/application/Applications";
import ApplicationDetails from "../components/application/ApplicationDetails";

const Home = () => {
    let { path } = useRouteMatch();

    return (
        <div>
            <TopBar />
            <div className='mb-5' />
            <Switch>
                <UserProtectedRoute exact path={`${path}`} component={UserDashboard} />
                <UserProtectedRoute exact path={`${path}mentorship/:mentorshipId`} component={MentorshipDetails} />
                <UserProtectedRoute path={`${path}mentorship/:mentorshipId/phases`} component={CreatePhase} />
                <UserProtectedRoute path={`${path}search`} component={Search} />
                <UserProtectedRoute path={`${path}post/:postId`} component={PostDetails} />
                <UserProtectedRoute path={`${path}application-form`} component={ApplicationForm} />
                <UserProtectedRoute exact path={`${path}applications`} component={Applications} />
                <UserProtectedRoute path={`${path}applications/:applicationId`} component={ApplicationDetails} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default Home;