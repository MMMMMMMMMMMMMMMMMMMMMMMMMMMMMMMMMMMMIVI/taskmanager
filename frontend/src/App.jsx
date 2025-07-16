import React from 'react';
import Navbar from "./Navbar";
import Overview from "./Overview";
import TaskForm from "./AddTask";


function App() {
    return (
        <title>Task Manager</title>,
        <Navbar/>,
        <Overview/>,
        <TaskForm />
    )
}

export default App;