import React from 'react';
import { Modal, Button} from "react-bootstrap";

function DeleteConfirmComp({ showModal, handleClose, deleteTask, task }) {

    if (!task) {
        return null;
    }

    return(
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>Are you sure you want to delete the Task "{task.title}" ?</Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => deleteTask(task.id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmComp;

