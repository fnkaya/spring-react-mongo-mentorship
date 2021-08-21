import {Icon, IconButton, Modal} from "rsuite";

const DynamicModal = (props) => {
    const { show, message, onClose, onConfirm } = props

    return (
        <Modal backdrop='static' show={show} onHide={onClose} size="xs">
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <IconButton onClick={onConfirm} appearance="primary" color='green'>
                    <Icon icon='thumbs-o-up' />
                    Evet
                </IconButton>
                <IconButton onClick={onClose} appearance="subtle" color='red'>
                    <Icon icon='close' />
                    Hayır
                </IconButton>
            </Modal.Footer>
        </Modal>
    )
}

export default DynamicModal