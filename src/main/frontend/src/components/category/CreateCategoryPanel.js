import {Button, Icon, IconButton, Input, Panel} from "rsuite";
import DynamicTagGroup from "./DynamicTagGroup";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createCategory} from "../../action/categoryActions";
import DynamicModal from "../common/DynamicModal";
import {validateCategory} from "../../util/Validator";

const CreateCategoryPanel = ({ setCreateMode }) => {
    const [ name, setName ] = useState('')
    const [ subjects, setSubjects ] = useState([])
    const [ valid, setValid ] = useState(false)
    const [ showModal, setShowModal ] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setValid(validateCategory(name, subjects))
    }, [name, subjects])

    const onModalConfirm = () => {
        dispatch(createCategory({name, subjects}))
        setShowModal(false)
        setCreateMode(false)
    }

    const modalMessage = "Kategori kaydedilecek onaylıyor musunuz?"

    return (
        <Panel shaded className='mb-3 bg-light'>
            <Input placeholder='Enter new category name' className='d-inline-block' onChange={value => setName(value)} style={{width: '50vh'}}/>
            <IconButton appearance='subtle' color='green' className='float-end' disabled={!valid} onClick={() => setShowModal(true)}>
                <Icon icon='save' />
                SAVE
            </IconButton>
            <DynamicTagGroup subjects={subjects} setSubjects={setSubjects} />
            <DynamicModal show={showModal} message={modalMessage} onClose={() => setShowModal(false)} onConfirm={onModalConfirm} />
        </Panel>
    )
}

export default CreateCategoryPanel