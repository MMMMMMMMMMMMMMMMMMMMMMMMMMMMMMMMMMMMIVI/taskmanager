import React, {useEffect, useState} from 'react';
import {CardContent, Grid, Card, Typography, List, ListItem, Button} from "@mui/material";
import EditComp from "./depricated_Components/EditComp";



function Overview() {

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

    return(
        <>
            <Grid container spacing={1} sx={{ marginLeft: 1 }}>
                {tasks.map((data) => {
                    return(
                       <Grid key={data.id} sx={{ xs: 12, sm: 6, md: 4 }}>
                           <Card sx={{ width: 320, height: 320, marginTop: 1, marginLeft: 0.5 }}>
                               <CardContent>

                                   <Typography component="div" variant="h5" sx={{ borderBottom: 1, borderColor: 'divider'}}>
                                       {data.title}
                                   </Typography>

                                   <Typography component="div" sx={{ maxHeight: 200, overflowY: 'auto', whiteSpace: 'pre-wrap', mb: 2 }}>
                                       <List>

                                           <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }} disableGutters>
                                               {data.description}
                                           </ListItem>

                                           <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }} disableGutters>
                                               <strong>Due Date: </strong> {data.dueDate}
                                           </ListItem>

                                           <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }} disableGutters>
                                               <strong>Priority: </strong> {data.priority}
                                           </ListItem>

                                           <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }} disableGutters>
                                               <strong>Status: </strong> {data.status}
                                           </ListItem>

                                       </List>
                                   </Typography>

                                   <Grid container spacing={2} justifyContent="center">
                                       <Grid>
                                           <Button
                                               variant="contained"
                                               color="primary"
                                               size="small"
                                               onClick={() => handleEditClick(data)}
                                           >
                                               Edit
                                           </Button>
                                       </Grid>

                                       <Grid>
                                           <Button
                                               variant="contained"
                                               color="error"
                                               size="small"
                                               onClick={() => handleDeleteClick(data)}
                                           >
                                               Delete
                                           </Button>
                                       </Grid>
                                   </Grid>

                               </CardContent>
                           </Card>
                       </Grid>
                    )
                })}
            </Grid>

            {taskToEdit && (
                <EditComp showModal={showEditModal}
                          handleClose={handleEditClose}
                          editTask={editTask}
                          task={taskToEdit}
                />
            )}
            {taskToDelete && (
                <EditComp showModal={showDeleteModal}
                          handleClose={handleDeleteClose}
                          editTask={deleteTask}
                          task={taskToDelete}
                />
            )}
        </>
    )
}

export default Overview;