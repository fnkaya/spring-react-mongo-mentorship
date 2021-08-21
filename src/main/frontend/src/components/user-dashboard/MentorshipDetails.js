import {Link, useParams, useRouteMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMentorshipById, updateMentorshipStatus} from "../../util/apiCall/MentorshipApiCall";
import {useSelector} from "react-redux";
import {Button, ButtonGroup, Divider, Message, Panel, Tag, Timeline} from "rsuite";
import moment from "moment";
import PhaseDetails from "./PhaseDetails";

const MentorshipDetails = () => {
    const { mentorshipId } = useParams()
    const { principals } = useSelector(state => state.authState.toJS())
    const [ mentorship, setMentorship ] = useState()
    const [ error, setError ] = useState()
    const { url } = useRouteMatch()

    useEffect(() => {
        moment.locale('tr')
        getMentorshipById(mentorshipId)
            .then(response => {
                if (response.status === 200) {
                    setMentorship(response.data)
                }
                else {
                    setError(response.data)
                }
            })
    }, [])

    const updateStatus = (status) => {
        setError(undefined)
        updateMentorshipStatus(mentorshipId, status)
            .then(response => {
                if (response.status === 200) {
                    setMentorship(response.data)
                }
                else {
                    setError(response.data)
                }
            })
    }

    return (
        <div className='container'>
            <div className='p-5 m-3'>
                {
                    mentorship && (
                        <>
                            <Panel bordered className='mb-3 p-4 bg-light'>
                                <div>
                                    <span className='h5'>Mentor: </span>
                                    <span className='fs-6 text-muted'>{mentorship.mentor.account.name}</span>
                                </div>
                                <Divider className='my-3' />
                                <div>
                                    <span className='h5'>Mentee: </span>
                                    <span className='fs-6 text-muted'>{mentorship.mentee.name}</span>
                                </div>
                                <Divider className='my-3' />
                                <div>
                                    <span className='h5'>Kategori: </span>
                                    <Tag color='violet'>{mentorship.category.name}</Tag>
                                </div>
                                <Divider className='my-3' />
                                <div>
                                    <span className='h5'>Konu: </span>
                                    <Tag color='yellow'>{mentorship.category.subject}</Tag>
                                </div>
                                <Divider className='my-3' />
                                <div>
                                    <span className='h5'>Durum: </span>
                                    <Tag className='fs-6' color={mentorship.status === 'PENDING' ? 'orange' : mentorship.status === 'REJECTED' ? 'red' : 'green'} >{mentorship.status}</Tag>
                                </div>
                                {
                                    mentorship.startDate && (
                                        <>
                                            <Divider className='my-3' />
                                            <div>
                                                <span className='h5'>Başlangıç tarihi: </span>
                                                <span className='fs-6 text-muted'>{moment(mentorship.startDate).format('lll')}</span>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    error && (
                                        <Message className='my-3' showIcon closable type='error' description={error.message} />
                                    )
                                }
                                {
                                    mentorship.status === 'PENDING' && mentorship.mentor.account.id === principals.id && (
                                        <ButtonGroup className='float-end mb-4'>
                                            <Button color='green' appearance='subtle' onClick={() => updateStatus('ACCEPTED')}>ONAYLA</Button>
                                            <Button color='red' appearance='subtle' onClick={() => updateStatus('REJECTED')}>REDDET</Button>
                                        </ButtonGroup>
                                    )
                                }
                                {
                                    mentorship.status === 'ACCEPTED' && (
                                        <Link to={`${url}/phases`}>
                                            <Button className='float-end mb-4' color='violet'>SÜREÇ PLANLA</Button>
                                        </Link>
                                    )
                                }
                            </Panel>
                            <Timeline align='alternate'>
                                {
                                    mentorship.phases &&
                                    mentorship.phases.map(phase => (
                                        <PhaseDetails key={phase.id} phase={phase} principals={principals} mentorship={mentorship} setMentorship={setMentorship} />
                                    ))
                                }
                            </Timeline>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default MentorshipDetails