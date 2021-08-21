import {useHistory, useParams} from "react-router-dom";
import {Modal} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {getApplicationById, updateApplicationStatus} from "../../util/apiCall/ApplicationFormApiCall";
import {Button, ButtonGroup, Divider, Message, Panel, Tag} from "rsuite";
import moment from "moment";

const ApplicationDetails = () => {
    const { applicationId } = useParams()
    const [ application, setApplication ] = useState()
    const [ error, setError ] = useState()
    const [ showModal, setShowModal ] = useState(false)
    const [ status, setStatus ] = useState('')
    const history = useHistory()

    useEffect(() => {
        moment.locale('tr')
        getApplicationById(applicationId)
            .then(response => {
                if (response.status === 200) {
                    setApplication(response.data)
                }
                else {
                    setError(response.data)
                }
            })
    }, [])

    const onButtonClick = (status) => {
        setStatus(status)
        setShowModal(true)
    }

    const onSubmit = () => {
        updateApplicationStatus(applicationId, status)
            .then(response => history.goBack())
    }

    return (
        <div className='m-5 p-5'>
            {
                error && (
                    <Message
                        showIcon
                        closable
                        className='mb-3'
                        type="error"
                        title="Bir hata oluştu"
                        description={error.message}/>
                )
            }

            <Panel bordered className='container p-5'>
                {
                    application && (
                        <>
                            <div className='mb-4'>
                                <h5>Başvuru sahibi</h5>
                                <div className="row">
                                    <div className='col'>Kullanıcı adı: <Tag>{application.owner.username}</Tag></div>
                                    <div className='col'>İsim: <Tag>{application.owner.name}</Tag></div>
                                    <div className='col'>E-mail: <Tag>{application.owner.email}</Tag></div>
                                </div>
                            </div>
                            <Divider/>
                            <div className='mb-4'>
                                <h5>Konu</h5>
                                <div className='mb-3'>Ana konu: <Tag color='violet'>{application.category.name}</Tag></div>
                                <div>Alt konular: {application && application.category.subjects.map(s => (<Tag key={s} color='yellow'>{s}</Tag>))}</div>
                            </div>
                            <Divider/>
                            <div className='mb-5'>
                                <h5>Açıklama: </h5>
                                <p>{application.description}</p>
                            </div>
                            <Divider/>
                            <div className='mb-5'>
                                <span>Başvuru tarihi: <Tag>{moment(application.date).format('lll')}</Tag></span>
                                <span className='float-end'>Başvuru durumu:
                                    <Tag color={application.status === 'PENDING' ? 'orange' : application.status === 'ACCEPTED' ? 'green' : 'red'} className='ms-2'>
                                        {application.status}
                                    </Tag>
                                </span>
                            </div>
                            {
                                application.status === 'PENDING' && (
                                    <ButtonGroup className='float-end border rounded-3'>
                                        <Button appearance='subtle' color='green' onClick={() => onButtonClick('ACCEPTED')}>KABUL ET</Button>
                                        <Button appearance='subtle' color='red' onClick={() => onButtonClick('REJECTED')}>REDDET</Button>
                                    </ButtonGroup>
                                )
                            }
                        </>
                    )
                }
            </Panel>

            <Modal
                basic
                size='tiny'
                dimmer='blurring'
                open={showModal}
            >
                <Modal.Header>Başvuru durumu güncellenecek</Modal.Header>
                <Modal.Content>
                    <p>Başvuru durumunu {status.toLowerCase()} olarak güncellemek istiyor musunuz?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={onSubmit} className='me-3'>
                        Evet
                    </Button>
                    <Button color='red' onClick={() => setShowModal(false)}>
                        Hayır
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default ApplicationDetails