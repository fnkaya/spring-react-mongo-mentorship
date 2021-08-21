import MenteeList from "./MenteeList";
import MentorList from "./MentorList";

const UserDashboard = () => {

    return (
        <div className='container p-5'>
            <div className="row">
                <div className="col-6">
                    <MentorList/>
                </div>
                <div className='col-6'>
                    <MenteeList/>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard;