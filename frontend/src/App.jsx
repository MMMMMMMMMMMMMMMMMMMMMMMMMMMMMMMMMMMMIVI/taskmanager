import React, {useState} from 'react';
import NavbarComp from "./NavbarComp";
import OverviewComp from "./OverviewComp";
import AddTaskComp from "./AddTaskComp";

function App() {

    const [currentView, setCurrentView] = useState("/overview")
    const handleNavClick = (view) => { setCurrentView(view)}

    return (
        <div>
            <title>Task Manager</title>
            <NavbarComp onNavClick={handleNavClick}/>
            {currentView === "/overview" && <OverviewComp/>}
            {currentView === "/addTask" && <AddTaskComp/>}
        </div>
    )
}

export default App;