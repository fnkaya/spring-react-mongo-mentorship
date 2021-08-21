import {useEffect, useState} from "react";
import axios from "axios";
import {Panel} from "rsuite";

const MentorList = () => {
    const [ mentors, setMentors ] = useState()
    useEffect(() => {
        axios.get("/api/mentors", {validateStatus: status => true})
            .then(response => {
                if (response.status === 200) {
                    setMentors(response.data.content)
                }
            })
    }, [])

    return (
        <div className='container p-5 mt-5'>
            {
                mentors &&
                mentors.map(m => (
                    <Panel shaded className='mb-3'>
                        {JSON.stringify(mentors)}
                    </Panel>
                ))
            }
        </div>
    )
}

export default MentorList