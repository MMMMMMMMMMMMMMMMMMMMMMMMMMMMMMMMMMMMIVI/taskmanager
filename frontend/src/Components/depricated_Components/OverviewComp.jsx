import React, {useEffect, useState} from 'react';
import {Button, Card, ListGroup, Row, Col} from "react-bootstrap";
import DeleteConfirmComp from "./DeleteConfirmComp";
import EditComp from "./EditComp";


function OverviewComp() {

    const [tasks, setTasks] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleDeleteClick = (task) => {
        setTaskToDelete(task)
        setShowDeleteModal(true)
    };
    const handleDeleteClose = () => {
        setTaskToDelete(null)
        setShowDeleteModal(false)
    };

    const handleEditClick = (task) => {
        setTaskToEdit(task)
        setShowEditModal(true)
    }

    const handleEditClose = () => {
        setTaskToEdit(null)
        setShowEditModal(false)
    }

    const getTasks = async () => {
        const response = await fetch('http://localhost:8080/task/all');

        setTasks(await response.json());
    }

    const deleteTask = async (id) => {

        handleDeleteClose()
        try {
            const response = await fetch(`http://localhost:8080/task/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: id
            })
            if (response.ok) {
                console.log(`Deleted ${id}`)
                await getTasks()
            } else {
                console.error("Failed to delete task:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during delete API call:", error);
        }
    }

    const editTask = async (task) => {

        handleEditClose()
        try {
            console.log(`Editing task: ${task.id}\nStage: OverviewComp.jsx editTask()`)
            const response = await fetch(`http://localhost:8080/task/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            })
            if (response.ok) {
                console.log(`Edited ${task.id}`)
                await getTasks()
            }
        }

        catch (error) {
            console.error("Error during edit API call:", error);
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

  return (
      <>
          <Row style={{ marginLeft: "0rem"}}>
              {tasks.map((data) => {
                  return (
                      <Card key={data.id} style={{ width: "20rem", marginTop: "0.5rem", marginLeft: "0.5rem"}}>
                          <Card.Body>
                              <Card.Title>{data.title}</Card.Title>
                              <Card.Text>
                                  <ListGroup style={{ maxHeight: "20rem"}}>
                                      <ListGroup.Item style={{ overflowY: "auto", whiteSpace: "pre-wrap" }}>
                                          {data.description}
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                          {data.dueDate}
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                          {data.priority}
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                          {data.status}
                                      </ListGroup.Item>
                                  </ListGroup>
                              </Card.Text>
                              <Row className={"justify-content-evenly"}>
                                  <Col>
                                      <Button variant="primary" size={"sm"} onClick={() => handleEditClick(data)}>
                                          Edit
                                      </Button>
                                  </Col>
                                  <Col>
                                      <Button variant="danger" size={"sm"} onClick={() => handleDeleteClick(data)}>
                                          Delete
                                      </Button>
                                  </Col>
                              </Row>
                          </Card.Body>
                      </Card>
                  )
              })}
          </Row>
          {
              taskToDelete && (
                <DeleteConfirmComp
                    showModal={showDeleteModal}
                    handleClose={handleDeleteClose}
                    deleteTask={deleteTask}
                    task={taskToDelete}
                />
              )
          }
          {
              taskToEdit && (
                  <EditComp
                      showModal={showEditModal}
                      handleClose={handleEditClose}
                      editTask={editTask}
                      task={taskToEdit}
                  />
              )
          }
      </>
  );
}

export default OverviewComp;