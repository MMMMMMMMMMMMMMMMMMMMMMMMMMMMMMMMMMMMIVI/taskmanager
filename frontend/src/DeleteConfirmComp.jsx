import React from 'react';
import { Modal, Button} from "react-bootstrap";

function DeleteConfirmComp( props ) {

    return(
        <Modal show={props.showModal} onHide={props.handleClose}>
            <Modal.Body>Are you sure you want to delete the Task ${props.data} ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => props.deleteTask(props.data.id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmComp;

