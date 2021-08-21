import {Alert, Button, Timeline, Icon, Panel, Divider, Rate} from "rsuite";
import {useEffect, useState} from "react";
import {updateMentorshipPhaseComment, updateMentorshipPhaseStatus} from "../../util/apiCall/MentorshipApiCall";
import moment from "moment";
import CommentModal from "./CommentModal";

const PhaseDetails = ({phase, principals, mentorship, setMentorship}) => {
    const [ showClosePhaseModal, setShowClosePhaseModal ] = useState(false)
    const [ showCommentModal, setShowCommentModal ] = useState(false)
    const [ lastPhase, setLastPhase ] = useState()

    useEffect(() => {
        moment.locale('tr')
    }, [])

    const openModal = (phase) => {
        let dayDiff = new Date(phase.endDate).getDate() - new Date().getDate();
        console.log(dayDiff)
        if (dayDiff <= 1) {
            setShowClosePhaseModal(true)
            setLastPhase(phase)
        }
        else {
            Alert.error(<p>Fazı {dayDiff - 1} gün sonra sonlandırabilirsiniz.</p>, 5000)
        }
    }

    const openModalComment = (phase) => {
        setShowCommentModal(true)
        setLastPhase(phase)
    }

    const closePhase = (text, rate) => {
        if (lastPhase) {
            let phase
            if (principals.id === mentorship.mentee.id) {
                phase = {...lastPhase, menteeComment: {text, rate}, status: 'DONE'}
            }
            else if (principals.id === mentorship.mentor.account.id) {
                phase = {...lastPhase, mentorComment: {text, rate}, status: 'DONE'}
            }
            updateMentorshipPhaseStatus(mentorship.id, phase)
                .then(response => {
                    setMentorship(response.data)
                    setShowClosePhaseModal(false)
                })
        }
    }

    const saveComment = (text, rate) => {
        if (lastPhase) {
            let newPhase
            if (principals.id === mentorship.mentee.id) {
                newPhase = {...lastPhase, menteeComment: {text, rate}}
            }
            else if (principals.id === mentorship.mentor.account.id) {
                newPhase = {...lastPhase, mentorComment: {text, rate}}
            }
            updateMentorshipPhaseComment(mentorship.id, newPhase)
                .then(response => {
                    setMentorship(response.data)
                    setShowCommentModal(false)
                })
        }
    }

    const renderButton = (phase) => {
        if (phase.status === 'ACTIVE') {
            return (
                <Button className='float-end my-2' size='xs' color='red' onClick={() => openModal(phase)}>FAZI SONLANDIR</Button>
            )
        }
        else if (phase.status === 'DONE') {
            if ((principals.id === mentorship.mentee.id) && !phase.menteeComment) {
                return (
                    <Button className='my-3 float-start' size='xs' color='blue' onClick={() => openModalComment(phase)}>DEĞERLENDİR</Button>
                )
            }
            else if ((principals.id === mentorship.mentor.account.id) && !phase.mentorComment) {
                return (
                    <Button className='my-3 float-start' size='xs' color='blue' onClick={() => openModalComment(phase)}>DEĞERLENDİR</Button>
                )
            }
        }
    }

    return (
        <Timeline.Item >
            <Panel bordered className={`${phase.status === 'ACTIVE' ? 'border-info' : ''}`}>
                <div>
                    <span className='h6 float-start'>{phase.name}</span>
                    <span className='float-end text-muted'>
                        <Icon name='clock outline' />{moment(phase.endDate).format('lll')}
                    </span>
                </div>
                {
                    phase.mentorComment && (
                        <div className='p-1'>
                            <Divider/>
                            <span className='fs-6 float-start'>{mentorship.mentor.account.name}: </span>
                            <span className='text-muted float-start'>{phase.mentorComment.text}</span>
                            <Rate className='float-end' readOnly size='xs' value={phase.mentorComment.rate} />
                        </div>
                    )
                }
                {
                    phase.menteeComment && (
                        <div className='p-1'>
                            <Divider/>
                            <span className='fs-6 float-start'>{mentorship.mentee.name}: </span>
                            <span className='text-muted float-start'>{phase.menteeComment.text}</span>
                            <Rate className='float-end' readOnly size='xs' value={phase.menteeComment.rate} />
                        </div>
                    )
                }
                <div className='mt-4'>
                    {renderButton(phase)}
                </div>
            </Panel>
            <CommentModal show={showClosePhaseModal} onClose={() => setShowClosePhaseModal(false)} onSubmit={closePhase} />
            <CommentModal show={showCommentModal} onClose={() => setShowCommentModal(false)} onSubmit={saveComment} />
        </Timeline.Item>
    )
}

export default PhaseDetails