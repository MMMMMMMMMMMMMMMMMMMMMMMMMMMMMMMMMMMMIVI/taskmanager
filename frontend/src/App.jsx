import React, {useState} from 'react';
import AddTaskComp from "./Components/depricated_Components/AddTaskComp";
import Navbar from "./Components/Navbar";
import Overview from "./Components/Overview";

function App() {

    const [currentView, setCurrentView] = useState("overview")
    const switchView = (view) => { setCurrentView(view)}

    return (
        <div>
            <title>Task Manager</title>
                <Navbar onNavClick={switchView}/>
            {currentView === "overview" ? (
                <Overview/>
            ) : (
                <AddTaskComp switchView={switchView}/>
            )}
        </div>
    )
}

export default App;