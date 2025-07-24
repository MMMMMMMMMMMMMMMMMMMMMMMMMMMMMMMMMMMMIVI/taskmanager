import React, {useState} from 'react';
import NavbarComp from "./Components/NavbarComp";
import OverviewComp from "./Components/OverviewComp";
import AddTaskComp from "./Components/AddTaskComp";

function App() {

    const [currentView, setCurrentView] = useState("overview")
    const switchView = (view) => { setCurrentView(view)}

    return (
        <div>
            <title>Task Manager</title>
            <NavbarComp onNavClick={switchView}/>
            {currentView === "overview" ? (
                <OverviewComp switchView={switchView}/>
            ) : (
                <AddTaskComp switchView={switchView}/>
            )}
        </div>
    )
}

export default App;