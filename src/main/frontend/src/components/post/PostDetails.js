import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPostById} from "../../util/apiCall/PostApiCall";
import {Alert, Badge, Button, Divider, Icon, IconButton, Message, Panel, Rate, Tag} from "rsuite";
import {useSelector} from "react-redux";
import DynamicModal from "../common/DynamicModal";
import {saveMentorship} from "../../util/apiCall/MentorshipApiCall";

const PostDetails = () => {
    const { principals } = useSelector(state => state.authState.toJS())
    const [ post, setPost ] = useState()
    const [ applicationMode, setApplicationMode ] = useState(false)
    const [ selectedSubject, setSelectedSubject ] = useState()
    const [ error, setError ] = useState(undefined)
    const [ showModal, setShowModal ] = useState(false)
    const { postId } = useParams()


    useEffect(() => {
        getPostById(postId)
            .then(response => {
                if (response.status === 200) {
                    setPost(response.data)
                }
            })
    }, [])

    const onSelectTag = (e) => {
        const subject = e.target.innerText
        if (subject === selectedSubject) {
            setSelectedSubject(undefined)
        }
        else {
            setSelectedSubject(subject)
        }
    }

    const onModalConfirm = () => {
        setError(undefined)

        saveMentorship(post.owner.id, principals.id, post.category.name, selectedSubject)
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    Alert.success("Talebiniz program sahibine iletildi", 5000)
                    setApplicationMode(false)
                }
                else {
                    setError(response.data)
                }
            })
        setShowModal(false)
    }

    const modalMessage = "Mentorlük talep etmek üzeresiniz. Onaylıyor musunuz?"

    return (
        <div className='container p-5'>
            {
                post && (
                    <Panel shaded className='p-5 m-5 bg-light'>
                        <div>
                            <Badge className={post.owner.available ? 'bg-success' : 'bg-danger'}/>
                            <h5 className='d-inline-block ms-3'>Mentor: <span className='text-muted'>{post.owner.account.name}</span></h5>
                        </div>
                        <Divider/>
                        <div className='my-5'>
                            <h5 className='d-inline-block me-3'>Konu</h5>
                            <Tag color='violet'>{post.category.name}</Tag>
                            {
                                post.category.subjects.map(s => (
                                    <Tag key={s} color='yellow'>{s}</Tag>
                                ))
                            }
                        </div>
                        <Divider/>
                        <div>
                            <h5>Açıklama</h5>
                            <p>{post.description}</p>
                        </div>
                        {post.owner.available && (post.owner.account.id !== principals.id) && (
                            <>
                                <Divider/>
                                <Button color='cyan' className='my-3 float-end' disabled={applicationMode} onClick={() => setApplicationMode(true)}>Mentorlük talep et</Button>
                            </>
                        )}
                    </Panel>
                )
            }


            {
                applicationMode && (
                    <Panel shaded className='m-5 p-5 bg-light'>
                        <span className='text-muted'>Lütfen mentorlük talep etmek istediğiniz konuyu seçiniz</span>
                        <IconButton appearance='subtle' color='red' icon={<Icon icon='close' />} className='float-end' onClick={() => setApplicationMode(false)}/>
                        <div className='my-3'>
                            {
                                post &&
                                post.category.subjects.map(subject => (
                                    <Tag key={subject} color={subject === selectedSubject ? 'green' : ''} style={{cursor: 'pointer'}} className='border p-3 fw-bold' onClick={onSelectTag}>{subject}</Tag>
                                ))
                            }
                        </div>
                        <Button appearance='primary' color='green' className='float-end mb-3' disabled={!selectedSubject} onClick={() => setShowModal(true)}>Tamamla</Button>
                        {error && (<Message showIcon type='error' description={error.message} className='d-inline-block'/>)}
                    </Panel>
                )
            }

            <DynamicModal show={showModal} message={modalMessage} onClose={() => setShowModal(false)} onConfirm={onModalConfirm} />
        </div>
    )
}

export default PostDetails