import {useEffect, useState} from "react";
import {Button, Icon, IconButton, Input, Panel} from "rsuite";
import {validatePhase} from "../../util/Validator";
import {Message} from "semantic-ui-react";
import moment from "moment";
import {saveMentorshipPhases} from "../../util/apiCall/MentorshipApiCall";
import {useHistory, useParams} from "react-router-dom";

const CreatePhase = () => {
    const [ phases, setPhases ] = useState([])
    const [ newPhase, setNewPhase ] = useState({})
    const [ minDate, setMinDate ] = useState(new Date())
    const [ valid, setValid ] = useState(false)
    const history = useHistory()
    const { mentorshipId } = useParams()

    useEffect(() => {
        moment.locale('tr')
    }, [])

    useEffect(() => {
        setValid(validatePhase(newPhase))
    }, [newPhase.name, newPhase.endDate])

    const onChangeNameInput = (value) => {
        setNewPhase({...newPhase, name: value})
    }

    const onChangeDateInput = (e) => {
        setNewPhase({...newPhase, endDate: e.target.value})
    }

    const savePhase = () => {
        const endDate = new Date(newPhase.endDate);
        endDate.setDate(endDate.getDate() + 1)
        setMinDate(endDate)
        setPhases([...phases, newPhase])
        setNewPhase({})
    }

    const onSubmit = () => {
        phases[0].status = 'ACTIVE'
        saveMentorshipPhases(mentorshipId, phases)
            .then(response => history.goBack())
    }

    return (
        <div className='container p-5'>
            <Panel bordered className='mb-4'>
                <div className='d-flex justify-content-around'>
                    <Input placeholder='Faz ismi giriniz' value={newPhase.name || ''} style={{width: '30vh'}}
                           onChange={onChangeNameInput} />
                    <input type='datetime-local' className='p-2 border-1 rounded-3'
                           value={newPhase.endDate || ''}
                           min={moment(minDate).format('YYYY-MM-DoTHH:mm')}
                           onChange={onChangeDateInput} />
                    <IconButton appearance='primary' color='green' disabled={!valid} onClick={savePhase} icon={<Icon icon='plus'/>} >EKLE</IconButton>
                </div>
            </Panel>
            {
                phases.length > 0 && (
                    <Panel bordered>
                        {
                            phases.map(phase => (
                                <Message key={phase.endDate} className='mb-4'>
                                    <span>Faz: {phase.name}</span>
                                    <span className='float-end'>Bitiş tarihi: {moment(phase.endDate).format('lll')}</span>
                                </Message>
                            ))
                        }
                        <Button className='float-end mb-4' color='green' onClick={onSubmit}>SÜRECİ BAŞLAT</Button>
                    </Panel>
                )
            }
        </div>
    )
}

export default CreatePhase