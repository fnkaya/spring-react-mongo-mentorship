import {Button, Input, Modal, Rate} from "rsuite";
import {useState} from "react";

const CommentModal = ({show, onClose, onSubmit}) => {
    const [ text, setText ] = useState()
    const [ rate, setRate ] = useState(5)

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>Yorum</Modal.Header>
            <Modal.Body>
                <Rate defaultValue={rate} onChange={value => setRate(value)} />
                <Input onChange={value => setText(value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button color='green' onClick={() => onSubmit(text, rate)}>YORUM YAP</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CommentModal