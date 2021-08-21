import {useEffect, useState} from "react";
import {Message} from "semantic-ui-react";
import {getAllApplicationFormsByOwnerId} from "../../util/apiCall/ApplicationFormApiCall";
import {useSelector} from "react-redux";
import {Button, Divider, Panel, Tag} from "rsuite";
import moment from "moment";
import {Link, useRouteMatch} from "react-router-dom";

const Applications = () => {
    const { principals } = useSelector(state => state.authState.toJS())
    const [ applications, setApplications ] = useState([])
    const [ error, setError ] = useState(undefined)
    const { url } = useRouteMatch()

    useEffect(() => {
        moment.locale('tr')
        if (principals) {
            getAllApplicationFormsByOwnerId(principals.id)
                .then(response => {
                    if (response.status === 200) {
                        setApplications(response.data.content)
                    }
                    else {
                        setError(response.data)
                    }
                })
        }
    }, [])

    return (
        <div className='container p-5 mt-5'>
            {
                applications.length === 0 ? (
                    <Message
                        icon='th'
                        header='Henüz başvurunuz yok'
                        content={<a href={`application-form`} >
                            <p>Mentor başvurusu yapmak için tıklayın.</p>
                        </a>}
                    />
                ) :
                applications.map(application => (
                    <Panel key={application.id} bordered className='p-4 mb-3 bg-light'>
                        <div>Category: <span className="text-muted">{application.category.name}</span></div>
                        <div>Konular: <span className="text-muted">{application.category.subjects.join(', ')}</span></div>
                        <Divider/>
                        <div>Açıklama: <span className="text-muted">{application.description}</span></div>
                        <Divider/>
                        <div>
                            <span>Başvuru Tarihi: <span className="text-muted">{moment(application.date).format('lll')}</span></span>
                            <span className='float-end'>Durumu: <Tag color='cyan'>{application.status}</Tag></span>
                        </div>
                        <Divider/>
                        <div className='d-flex justify-content-end'>
                            {application.status === 'REJECTED' && (
                                <a href={`application-form`}>
                                    <Button color='red'>TEKRAR BAŞVUR</Button>
                                </a>)}
                            {application.status === 'ACCEPTED' && (
                                <Link to={`${url}/${application.id}`}>
                                    <Button color='orange'>GÜNCELLEME TALEP ET</Button>
                                </Link>
                            )}
                        </div>
                    </Panel>
                ))
            }
        </div>
    )
}

export default Applications