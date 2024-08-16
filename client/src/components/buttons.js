import React from "react";
import {Button} from '@mui/material';


const Buttons = ({pageClick}) => {

    return(
        <div>
            <Button onClick={() => pageClick('/workoutplan')}>Workout Plan</Button><br></br>
            <Button onClick={() => pageClick('/progress')}>Progress Tracker</Button><br></br>
            <Button onClick={() => pageClick('/dietplan')}>Diet Plan</Button><br></br>
        </div>
    );
}

export default Buttons;