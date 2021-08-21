import {Button, ButtonContent, Card, Icon} from "semantic-ui-react";
import moment from "moment";
import 'moment/locale/tr'
import {Link, useRouteMatch} from "react-router-dom";
import {useEffect} from "react";
import {Tag} from "rsuite";

const ApplicationCard = ({ application } ) => {
    const { url } = useRouteMatch()

    useEffect(() => {
        moment.locale('tr')
    }, [])

    return (
        <Card className='w-100'>
            <Card.Content header={<span className='text-muted' >Başvuru sahibi: <span className='fw-bolder'>{application.owner.username}</span></span>} />
            <Card.Content extra>
                <div className='my-2'>
                    <span className='fs-5 me-2'>Kategori:</span>
                    <Tag color='violet'>{application.category.name}</Tag>
                </div>
                <div className='my-2'>
                    <span className='fs-5 me-2'>Konular:</span>
                    {
                        application.category.subjects.map(subject => (
                            <Tag key={subject} color='yellow'>{subject}</Tag>
                        ))
                    }
                </div>
            </Card.Content>
            <Card.Content extra>
                <div className='mb-3'>
                    <Icon name='clock' />{moment(application.date).format('lll')}
                    <Tag className='float-end me-2' color={application.status === 'PENDING' ? 'orange' : application.status === 'ACCEPTED' ? 'green' : 'red'}>{application.status}</Tag>
                </div>
                <Link to={`${url}/applications/${application.id}`}>
                    <Button fluid>DETAY</Button>
                </Link>
            </Card.Content>
        </Card>
    )
}

export default ApplicationCard