import {ButtonGroup, Icon, IconButton, Input, Panel, PanelGroup, Tag} from "rsuite";
import {useEffect, useState} from "react";
import DynamicTagGroup from "./DynamicTagGroup";
import {useDispatch} from "react-redux";
import {deleteCategory, updateCategory} from "../../action/categoryActions";
import DynamicModal from "../common/DynamicModal";
import {validateCategory} from "../../util/Validator";

const CategoryPanel = ({category}) => {
    const { name, subjects } = category
    const [ newName, setNewName ] = useState(name)
    const [ newSubjects, setNewSubjects ] = useState(subjects)
    const [ valid, setValid ] = useState(false)
    const [ showUpdateModal, setShowUpdateModal ] = useState(false)
    const [ showDeleteModal, setShowDeleteModal ] = useState(false)
    const [ editMode, setEditMode ] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setValid(validateCategory(newName, newSubjects))
    }, [newName, newSubjects])

    const toggleEditMode = () => {
        setEditMode(!editMode)

        if (!editMode) {
            setNewName(name)
        }
    }

    const onUpdateModalConfirm = () => {
        dispatch(updateCategory({
            id: category.id,
            name: newName,
            subjects: newSubjects
        }))
        setShowUpdateModal(false)
        setEditMode(false)
    }

    const onDeleteModalConfirm = () => {
        dispatch(deleteCategory(category.id))
        setShowDeleteModal(false)
    }

    const updateModalMessage = "Değişiklikler kaydedilecek onaylıyor musunuz?"
    const deleteModalMessage = "Kategori silinecek onaylıyor musunuz?"

    return (
        <Panel header={category.name} shaded className={`mb-3 ${editMode ? 'bg-light' : ''}`} >
            {
                editMode ?
                    (
                        <>
                            <Input value={newName} onChange={(value) => setNewName(value)} style={{width: '50vh'}}/>
                            <DynamicTagGroup subjects={newSubjects} setSubjects={setNewSubjects} />
                        </>
                    )
                :
                    (
                        subjects && subjects.map(subject => (
                            <Tag key={subject} color='violet'>{subject}</Tag>
                        ))
                    )
            }

            <ButtonGroup className='float-end mb-4'>
                <IconButton icon={<Icon icon={!editMode ? 'edit': 'close'} />} appearance='subtle'
                            color={!editMode ? 'orange' : 'red'} className='ms-2' onClick={toggleEditMode}/>

                {!editMode && (<IconButton icon={<Icon icon='trash' />} appearance='subtle' color='red' onClick={() => setShowDeleteModal(true)}/>)}

                {editMode && (<IconButton icon={<Icon icon='save' />} disabled={!valid} appearance='subtle' color='green' onClick={() => setShowUpdateModal(true)}/>)}
            </ButtonGroup>

            <DynamicModal show={showDeleteModal} message={deleteModalMessage} onClose={() => setShowDeleteModal(false)} onConfirm={onDeleteModalConfirm} />
            <DynamicModal show={showUpdateModal} message={updateModalMessage} onClose={() => setShowUpdateModal(false)} onConfirm={onUpdateModalConfirm} />
        </Panel>
    )
}

export default CategoryPanel