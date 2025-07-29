import React, {useState} from 'react';
import {Nav} from 'react-bootstrap';

function NavbarComp( {onNavClick} ) {

    const [activeKey, setActiveKey] = useState("overview")
    const handleSelect = (selectedKey) => setActiveKey(selectedKey)

    return (
        <div className="border-bottom p-1">
            <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
                <Nav.Link eventKey="title" disabled={ true }>
                    Task Manager
                </Nav.Link>
                <Nav.Link eventKey="overview" onClick={() => onNavClick("overview")}>
                    Overview
                </Nav.Link>
                <Nav.Link eventKey="addtask" onClick={() => onNavClick("addTask")}>
                    New Task
                </Nav.Link>
            </Nav>
        </div>
    )
}

export default NavbarComp;