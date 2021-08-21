import {useEffect, useState} from "react";
import {getMentorshipsByMentorId} from "../../util/apiCall/MentorshipApiCall";
import {useSelector} from "react-redux";
import {Panel, Tag} from "rsuite";
import {Button, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";

const MenteeList = () => {
    const { principals } = useSelector(state => state.authState.toJS())
    const [ mentorships, setMentorships ] = useState()
    const [ error, setError ] = useState(undefined)

    useEffect(() => {
        if (principals) {
            getMentorshipsByMentorId(principals.id)
                .then(response => {
                    if (response.status === 200) {
                        setMentorships(response.data)
                    }
                    else {
                        setError(response.data)
                    }
                })
        }
    }, [])

    return (
        <div>
            <h5>Mentee List</h5>
            {
                mentorships &&
                mentorships.map(mentorship => (
                    <Panel key={mentorship.id} shaded className='p-3 mb-3 bg-light'>
                        <div className='mb-3'>{mentorship.mentee.name}</div>
                        <Tag className='mb-3'>{mentorship.category.name}</Tag>
                        <Tag className='mb-3'>{mentorship.category.subject}</Tag>
                        <div>
                            <Tag className='mb-3' color={mentorship.status === 'PENDING' ? 'orange' : mentorship.status === 'REJECTED' ? 'red' : 'green'} >{mentorship.status}</Tag>
                            <Link to={`mentorship/${mentorship.id}`} >
                                <Button color='teal' className='float-end'>
                                    DETAY
                                </Button>
                            </Link>
                        </div>
                    </Panel>
                ))
            }
            {
                mentorships &&
                mentorships.length === 0 && (
                    <Message color='teal'>
                        Henüz mentor olarak katıldığınız bir program yok
                    </Message>
                )
            }
            {
                error && (
                    <Message color='red'>
                        {error.message}
                    </Message>
                )
            }
        </div>
    )
}

export default MenteeList