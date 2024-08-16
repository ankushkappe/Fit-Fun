import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Checkbox, Pagination } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const WorkoutProgress = () => {
    const [workoutData, setWorkoutData] = useState([]);
    const [workoutStats, setWorkoutStats] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(0); // Track current week (0 to 3 for 4 weeks)
    const [completedExercises, setCompletedExercises] = useState({});

    const location = useLocation();
    const primaryPlan = location.state;
    
    useEffect(() => {
        const fetchPrimaryPlan = async () => {
            try {
                const response = await axios.get('http://localhost:4000/getWorkoutPlans');
                const primary = response.data.find(plan => plan._id === primaryPlan.primaryPlan._id);
                const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const weeklyData = weekDays.map(day => ({
                    day,
                    exercises: primary.plan[day]?.exercises || [],
                }));

                setWorkoutData(weeklyData);

                const exerciseStats = {};
                weeklyData.forEach(({ exercises }) => {
                    exercises.forEach(exercise => {
                        if (typeof exercise === 'string') return;
                        const { name } = exercise;
                        exerciseStats[name] = (exerciseStats[name] || 0) + 1;
                    });
                });

                const formattedStats = Object.keys(exerciseStats).map((name) => ({
                    name,
                    value: exerciseStats[name],
                }));

                setWorkoutStats(formattedStats);
            } catch (error) {
                console.error('Error fetching primary plan:', error);
            }
        };

        fetchPrimaryPlan();
    }, []);

    const handleCheckboxChange = (day) => {
        setCompletedExercises(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    const weeks = [0, 1, 2, 3];
    const currentWeekData = workoutData.slice(currentWeek * 7, (currentWeek + 1) * 7);

    const totalDays = Object.keys(workoutData).length;
    const completedDaysCount = Object.values(completedExercises).filter(Boolean).length;
    const progressPercentage = (completedDaysCount / totalDays) * 100;

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Workout Progress
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Workout Breakdown</Typography>
                    <PieChart width={1000} height={400}>
                        <Pie
                            data={workoutStats}
                            cx={300}
                            cy={200}
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {workoutStats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <CircularProgress variant="determinate" value={progressPercentage} size={100} sx={{ mr: 2 }} />
                        <Typography variant="h6">
                            Weekly Progress: {Math.round(progressPercentage)}%
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Weekly Plan</Typography>
                    <Table stickyHeader={true}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'><b>Day</b></TableCell>
                                <TableCell align='center'><b>Exercise</b></TableCell>
                                <TableCell align='center'><b>Sets</b></TableCell>
                                <TableCell align='center'><b>Reps</b></TableCell>
                                <TableCell align='center'><b>Done</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentWeekData.map(({ day, exercises }) => (
                                <React.Fragment key={day}>
                                    {exercises.map((exercise, index) => (
                                        <TableRow key={index} hover={true}>
                                            {index === 0 && (
                                                <TableCell align='center' rowSpan={exercises.length || 1}>{day}</TableCell>
                                            )}
                                            <TableCell align='center'>
                                                {typeof exercise === 'string' ? exercise : exercise.name}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {typeof exercise === 'string' ? '' : exercise.sets}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {typeof exercise === 'string' ? '' : exercise.reps}
                                            </TableCell>
                                            {index === 0 && (
                                                <TableCell align='center' rowSpan={exercises.length || 1}>
                                                    <Checkbox
                                                        checked={completedExercises[day] || false}
                                                        onChange={() => handleCheckboxChange(day)}
                                                    />
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                {/* <Grid item xs={12} sx={{ mt: 2 }}>
                    <Pagination
                        count={weeks.length}
                        page={currentWeek + 1}
                        onChange={(event, value) => setCurrentWeek(value - 1)}
                        shape="rounded"
                    />
                </Grid> */}
            </Grid>
        </Box>
    );
};

export default WorkoutProgress;