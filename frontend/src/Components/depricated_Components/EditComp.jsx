import React, {useState} from 'react';
import TaskFormComp from "./TaskFormComp";
import {Modal} from "react-bootstrap";


function EditComp({ showModal, handleClose, editTask, task }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description) {
            setMsg("Saving...")

            const taskData = {
                id: task.id,
                title,
                description,
                dueDate,
                priority,
                status
            };
            console.log(`Editing task: ${task.id}\nStage: EditComp.jsx handleSubmit()`)
            try {
                editTask(taskData)
            } catch (error) {
                console.error("Error during edit API call:", error);
            }


        } else {
            setError("Not all required fields are filled out")
            setTimeout(() => setError(null), 3000)
        }
    };

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.status);
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState(null);

    if (!task) {
        return null;
    }

    return(
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>Editing Task</Modal.Header>
            <Modal.Body className={" d-flex justify-content-center "}>
                <TaskFormComp
                    handleSubmit={handleSubmit}
                    handleClose={handleClose}
                    isVisible={true}
                    title={title}
                    description={description}
                    dueDate={dueDate}
                    priority={priority}
                    status={status}
                    error={error}
                    msg={msg}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setDueDate={setDueDate}
                    setPriority={setPriority}
                    setStatus={setStatus}
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditComp;

