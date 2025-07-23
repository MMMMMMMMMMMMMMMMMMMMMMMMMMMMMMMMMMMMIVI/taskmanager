import React, {useEffect, useState} from 'react';
import {Button, Card, ListGroup, Row, Col} from "react-bootstrap";
import DeleteConfirmComp from "./DeleteConfirmComp";


function OverviewComp() {

    const [tasks, setTasks] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleDeleteClick = (task) => {
        setTaskToDelete(task)
        setShowDeleteModal(true)
    };
    const handleCloseDeleteModal = () => {
        setTaskToDelete(null)
        setShowDeleteModal(false)
    };

    const getTasks = async () => {
        const response = await fetch('http://localhost:8080/task/all');

        setTasks(await response.json());
    }

    const deleteTask = async (id) => {

        handleCloseDeleteModal()
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
                setTasks(tasks.filter(task => task.id !== id))
            } else {
                console.error("Failed to delete task:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during delete API call:", error);
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
                                      <Button variant="primary" size={"sm"} onClick={() => console.log(`Edit ${data.id}`)}>
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
                    handleClose={handleCloseDeleteModal}
                    deleteTask={deleteTask}
                    task={taskToDelete}/>
              )
          }
      </>
  );
}

export default OverviewComp;