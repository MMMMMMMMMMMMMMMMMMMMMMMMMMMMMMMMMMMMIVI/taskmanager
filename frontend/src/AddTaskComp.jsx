import React, { useState } from "react";
import {Button, Form, Alert, Col, Row} from "react-bootstrap"
import {wait} from "@testing-library/user-event/dist/utils";

function AddTaskComp() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (title && description) {
          console.log("New Task added: ", {title, description, dueDate, priority, status});
          setMsg("Saving...")

          const taskData = {
              title,
              description,
              dueDate,
              priority,
              status
          };

          fetch('http://localhost:8080/task/new', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(taskData),
          })
              .then(response => {
                  if (!response.ok) {
                      throw new Error(response.url + ' | ' + response.status + ' ' + response.statusText)
                  }
                  return response.text();
              })
              .then(data => {
                  console.log('YIPPIE', data);
                  setTitle("");
                  setDescription("");
                  setDueDate("");
                  setPriority(0);
                  setStatus("");
                  setError(null)
                  window.location.href = "/overview"
              })
              .catch((error) => {
                  console.error('Error:', error);
                  setError('Error:' + error.message);
              });
      } else {
          setError("Not all required fields are filled out")
          wait(3000).then(() => setError(null))
      }
  };

  return (
      <Form onSubmit={handleSubmit} className="border border-1 rounded p-3" style={{ width: "36rem", marginLeft: "1rem", marginTop: "1rem"}}>
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

          <Button variant={"primary"} type="submit">
              Save
          </Button>

      </Form>
  )
}

export default AddTaskComp;

