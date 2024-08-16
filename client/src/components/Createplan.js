import * as React from "react";
import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Checkbox,
    FormGroup,
    MenuItem,
    Select,
    InputLabel,
    Box,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Collapse, IconButton } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import dietPlans from '../assets/diet.json';
import axios from "axios";

const dietQuestions = [
    { type: "radio", text: "What's your gender?", options: ["Male", "Female", "Other"] },
    { type: "number", text: "What's your weight in lbs?" },
    { type: "number", text: "What's your daily calorie intake?" },
    { type: "checkbox", text: "What are your dietary preferences?", options: ["Vegetarian", "Vegan", "Paleo", "Keto", "Balanced"] },
    { type: "select", text: "Any food allergies?", options: ["None", "Peanuts", "Gluten", "Dairy", "Seafood"] },
];

function CreateDietPlan() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        gender: "",
        weight: "",
        calorieIntake: "",
        dietaryPreferences: [],
        foodAllergies: "",
    });

    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);
    const [Plans, setPlans] = useState(null);
    const [dietPlan, setdietPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openRows, setOpenRows] = useState({});

    useEffect(() => {
        // Fetch workouts from workouts.json
        const fetchDiets = async () => {
            try {
                setPlans(dietPlans.Diets.dietaryPreferences);
            } catch (error) {
                console.error("Error generating and fetching Diet Plans:", error);
            }
        };
        fetchDiets();
    }, []);
    
    const handleNext = () => {
        setStep(step + 1);
    };

    const handleRowClick = (day) => {
        setOpenRows((prev) => ({ ...prev, [day]: !prev[day] }));
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = () => {
        
        setSubmitted(true);
        setLoading(true);
        const selectedDiet = Plans[formData.dietaryPreferences];
        // console.log(selectedDiet);

        setTimeout(() => {
            setdietPlan(selectedDiet);
            setLoading(false);
        }, 5000); // 5 seconds delay
    };

    const handleInputChange = (event) => {
        const { name, value, checked } = event.target;
        if (name === "dietaryPreferences") {
            const newPreferences = checked
                ? [...formData.dietaryPreferences, value]
                : formData.dietaryPreferences.filter((preference) => preference !== value);
            setFormData({ ...formData, dietaryPreferences: newPreferences });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSavePlan = async () => {
        try {
            const response = await axios.post('http://localhost:4000/saveDietPlan', { DietaryPreferences: formData.dietaryPreferences, plan: dietPlan });
            console.log('Diet Plan saved');
        } catch (error) {
            console.error('Error saving plan:', error);
        }
    }
    
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
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                {submitted ? (
                    <>
                        {loading ? (
                            <Typography variant="h6">Generating...</Typography>
                        ) : (
                            dietPlan && (
                                <>
                                    <TableContainer sx={{ display: 'flex' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell><b>Day</b></TableCell>
                                                    <TableCell><b>Meals</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Object.entries(dietPlan.dietPlan).map(([day, { meals }]) => (
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
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <br />
                                    <br />
                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                        <Button variant="contained" onClick={() => setSubmitted(false)}>Generate Another Plan</Button>
                                        <Button variant="contained" onClick={handleSavePlan}>Save Plan</Button>
                                    </Box>
                                </>
                            )
                        )}
                    </>
                ) : (
                    <>
                        {step === 0 && (
                            <Box sx={{ my: 2 }}>
                                <Typography variant="body1">Hi, I'm your AI Diet Coach.</Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={handleNext}
                                    sx={{ width: '100%', mt: 1 }}
                                >
                                    Create Diet Plan
                                </Button>
                            </Box>
                        )}
                        {step > 0 && dietQuestions.slice(0, step).map((question, index) => (
                            <Box key={index} sx={{ my: 2 }}>
                                <Typography variant="body1">{question.text}</Typography>
                                {question.type === "radio" && (
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                        >
                                            {question.options.map((option) => (
                                                <FormControlLabel
                                                    key={option}
                                                    value={option}
                                                    control={<Radio  />}
                                                    label={option}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                )}
                                {question.type === "number" && (
                                    <TextField
                                        label={question.text}
                                        name={question.text.split(' ').slice(-2).join('')}
                                        type="number"
                                        value={formData[question.text.split(' ').slice(-2).join('')]}
                                        onChange={handleInputChange}
                                        sx={{ mt: 1 }}                                
                                    />
                                )}
                                {question.type === "checkbox" && (
                                    <FormControl component="fieldset">
                                        <FormGroup>
                                            {question.options.map((option) => (
                                                <FormControlLabel
                                                    key={option}
                                                    control={
                                                        <Checkbox
                                                            name="dietaryPreferences"
                                                            value={option}
                                                            checked={formData.dietaryPreferences.includes(option)}
                                                            onChange={handleInputChange}
                                                            
                                                        />
                                                    }
                                                    label={option}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                )}
                                {question.type === "select" && (
                                    <FormControl fullWidth sx={{ mt: 1 }}>
                                        <InputLabel >{question.text}</InputLabel>
                                        <Select
                                            name="foodAllergies"
                                            value={formData.foodAllergies}
                                            onChange={handleInputChange}
                                            
                                        >
                                            {question.options.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </Box>
                        ))}
                        {step > 0 && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    sx={{ width: '45%' }}
                                >
                                    Previous
                                </Button>
                                {step < dietQuestions.length ? (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ width: '45%' }}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        sx={{ width: '45%' }}
                                    >
                                        Submit
                                    </Button>
                                )}
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
}

export default CreateDietPlan;