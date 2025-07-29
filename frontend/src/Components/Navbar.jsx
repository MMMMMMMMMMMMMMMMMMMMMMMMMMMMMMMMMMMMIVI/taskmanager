import React, {useState} from 'react';
import {Box, Tab, Tabs} from '@mui/material';

function Navbar({onNavClick}) {

    const [value, setValue] = useState('overview');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onNavClick(newValue);
    }

    return(
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}>
                <Tab label="Task Manager" disabled={ true }/>
                <Tab value="overview" label="Overview"/>
                <Tab value="addTask" label="Add Task"/>
            </Tabs>
        </Box>
    )

}

export default Navbar;