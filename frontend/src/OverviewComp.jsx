import React, {useEffect, useState} from 'react';
import {Button, Card, ListGroup, Row, Col} from "react-bootstrap";
import DeleteConfirmComp from "./DeleteConfirmComp";


function OverviewComp() {

    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getTasks = async () => {
        const response = await fetch('http://localhost:8080/task/all');

        setTasks(await response.json());
    }

    const deleteTask = async (id) => {
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
                                      <ListGroup.Item style={{ overflowY: "auto"}}>{data.description}</ListGroup.Item>
                                      <ListGroup.Item>{data.dueDate}</ListGroup.Item>
                                      <ListGroup.Item>{data.priority}</ListGroup.Item>
                                      <ListGroup.Item>{data.status}</ListGroup.Item>
                                  </ListGroup>
                              </Card.Text>
                              <Row className="justify-content-between">
                                  <Col>
                                      <Button variant="primary" size={"sm"} onClick={() => console.log(`Edit ${data.id}`)}>
                                          Edit
                                      </Button>
                                  </Col>
                                  <Col>
                                      <Button variant="danger" size={"sm"} onClick={() => deleteTask(data.id)}>
                                          Delete
                                      </Button>
                                  </Col>
                              </Row>
                          </Card.Body>
                          <DeleteConfirmComp
                            showModal={show}
                            handleClose={handleClose}
                            deleteTask={deleteTask}
                            data={data}
                          />
                      </Card>
                  )
              })}
          </Row>
      </>
  );
}

export default OverviewComp;