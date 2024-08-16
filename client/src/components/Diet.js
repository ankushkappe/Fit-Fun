import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
    IconButton,
    Box,
    Paper,
    Typography
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function DietPlan() {
    const [openRows, setOpenRows] = useState({});
    const [diet, setDiet] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:4000/getDietPlans');
                // console.log('Fetched data:', response.data[0].plan);
                setDiet(response.data[0].plan);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };
        fetchPlans();
    }, []);

    const handleRowClick = (day) => {
        setOpenRows((prev) => ({ ...prev, [day]: !prev[day] }));
    };

    const renderMeals = (meals) => {
        return meals.map((meal, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1"><b>{meal.name}</b></Typography>
                <Typography variant="body2">
                    {meal.items.join(', ')}
                </Typography>
                <Typography variant="caption">Calories: {meal.calories}</Typography>
            </Box>
        ));
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell><b>Day</b></TableCell>
                        <TableCell><b>Meals</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {diet ? (
                        Object.entries(diet.dietPlan).map(([day, { meals }]) => (
                            <React.Fragment key={day}>
                                <TableRow onClick={() => handleRowClick(day)}>
                                    <TableCell>
                                        <IconButton size="small">
                                            {openRows[day] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{day}</TableCell>
                                    <TableCell>
                                        {meals.map((meal) => meal.name).join(', ')}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                                        <Collapse in={openRows[day]} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                {renderMeals(meals)}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                <Typography variant="body1">Loading...</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DietPlan;
