import React from 'react';
import {Alert, Button, Col, Form, Row} from "react-bootstrap";

function TaskFormComp({ handleSubmit, handleClose = () => console.log("somethings not right"), isVisible = false,
                        title, description, dueDate, priority, status, error, msg,
                        setTitle, setDescription, setDueDate, setPriority, setStatus }) {

    return(
        <Form onSubmit={handleSubmit} className="border border-1 rounded p-3" style={{ width: "36rem"}}>
            <Row>
                <Form.Group as={Col} style={{ marginBottom: "1rem" }}>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text"
                                  value={title}
                                  maxLength={20}
                                  placeholder="Enter title"
                                  onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Col} style={{ marginBottom: "1rem" }}>
                    <Form.Label>Due Date:</Form.Label>
                    <Form.Control
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </Form.Group>
            </Row>

            <Form.Group style={{ marginBottom: "1rem" }}>
                <Form.Label>Description:</Form.Label>
                <Form.Control
                    as="textarea" rows={3}
                    value={description}
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Select aria-label="priority"
                                 style={{ marginBottom: "1rem" }}
                                 value={priority}
                                 onChange={(e) => setPriority(e.target.value)}>
                        <option>Select Priority</option>
                        <option value={"low"}>Low</option>
                        <option value={"mid"}>Mid</option>
                        <option value={"high"}>High</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select aria-label={"status"}
                                 style={{ marginBottom: "1rem" }}
                                 value={status}
                                 onChange={(e) => setStatus(e.target.value)}>
                        <option>Select Status</option>
                        <option value={"draft"}>Draft</option>
                        <option value={"todo"}>To Do</option>
                        <option value={"inprogress"}>In Progress</option>
                        <option value={"done"}>Done</option>
                    </Form.Select>
                </Col>
            </Row>

            {error && <Alert key={"danger"} variant={"danger"}>{error}</Alert>}
            {msg && <Alert key={"success"} variant={"success"}>{msg}</Alert>}

            { isVisible &&
            <Button variant={"secondary"} onClick={handleClose}>
                Close
            </Button>
            }

            <Button variant={"primary"} type="submit">
                Save
            </Button>


        </Form>
    )
}

export default TaskFormComp;