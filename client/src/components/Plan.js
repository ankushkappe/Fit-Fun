import * as React from "react";
import { useState, useEffect } from "react";
import "../assets/plan.css";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  // FormLabel,
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
  Paper
} from "@mui/material";
import { Add } from "@mui/icons-material";
import data from '../assets/plans.json'
import axios from "axios";

const questions = [
  { type: "radio", text: "What's your gender?", options: ["Male", "Female", "Other"] },
  { type: "height", text: "What's your height?" },
  { type: "number", text: "What's your weight in lbs?" },
  { type: "eq", text: "What kind of Equipment do you have access to?"},
  { type: "checkbox", text: "What are your fitness goals?", options: ["Bulk", "Cut", "Healthy", "Increase Energy"] },
  { type: "select", text: "Which muscle groups do you want to focus on?", options: ["Abs", "Chest", "Upper Body", "Lower Body", "Legs", "Full Body"] },
];

function Plan() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    goals: [],
    muscleGroup: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [workouts, setWorkouts] = useState(null);
  const [heightInMeters, setheightInMeters] = useState(null);
  const [bmi, setbmi] = useState(null);
  const [ponderalIndex, setponderalIndex] = useState(null);

  useEffect(() => {
    // Fetch workouts from workouts.json
    const fetchWorkouts = async () => {
      try {
        // console.log(data);
        setWorkouts(data.workoutPlan.muscleGroups);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, []);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setLoading(true);

    const height = (((parseInt(formData.heightFeet)*12)+parseInt(formData.heightInches))*0.0254);
    setheightInMeters(height);
    setbmi(parseInt(formData.weight * 0.453592) / (height ** 2));
    setponderalIndex(parseInt(formData.weight) / (height ** 3));

    setTimeout(() => {
      setWorkoutPlan(workouts[formData.muscleGroup]);
      setLoading(false);
    }, 5000); // 5 seconds delay
  };

  
  let category = '';
  let categoryColor = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = 'red';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal';
    categoryColor = 'green';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    categoryColor = '#f2ac07';
  } else {
    category = 'Obesity';
    categoryColor = 'red';
  }

  const healthyWeightMin = 18.5 * (heightInMeters ** 2);
  const healthyWeightMax = 25 * (heightInMeters ** 2);


  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === "goals") {
      const newGoals = checked
        ? [...formData.goals, value]
        : formData.goals.filter((goal) => goal !== value);
      setFormData({ ...formData, goals: newGoals });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSavePlan = async () => {
    try {
      const response = await axios.post('http://localhost:4000/saveWorkoutPlan', { muscleGroup: formData.muscleGroup, plan: workoutPlan });
      console.log('Plan saved');
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {submitted ? (
          <>
            {loading ? (
              <Typography variant="h6">Generating...</Typography>
            ) : (
              workoutPlan && (
                <div>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                        BMI: {bmi.toFixed(1)} kg/m²
                      </Typography>
                      <Typography variant="body1" sx={{ color: categoryColor, fontWeight: 'bold' }}>
                        Category: {category}
                      </Typography>
                      <Typography variant="body1">
                        Healthy BMI range: 18.5 kg/m² - 25 kg/m²
                      </Typography>
                      <Typography variant="body1">
                        Healthy weight for the height: {healthyWeightMin.toFixed(1)} kg - {healthyWeightMax.toFixed(1)} kg
                      </Typography>
                      {/* <Typography variant="body1">
                        BMI Prime: {bmiPrime.toFixed(2)}
                      </Typography> */}
                      <Typography variant="body1">
                        Ponderal Index: {ponderalIndex.toFixed(1)} kg/m³
                      </Typography>
                    </Box>
                    <br></br>
                    <br></br>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><b>Day</b></TableCell>
                          <TableCell><b>Exercise</b></TableCell>
                          <TableCell><b>Sets</b></TableCell>
                          <TableCell><b>Reps</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(workoutPlan).map(([day, { exercises }]) => (
                          <TableRow key={day}>
                            <TableCell>{day}</TableCell>
                            <TableCell>
                              {exercises.map((exercise, index) => (
                                typeof exercise === 'string' ? (
                                  exercise
                                ) : (
                                  <div key={index}>{exercise.name}</div>
                                )
                              ))}
                            </TableCell>
                            <TableCell>
                              {exercises.map((exercise, index) => (
                                typeof exercise === 'string' ? (
                                  ""
                                ) : (
                                  <div key={index}>{exercise.sets}</div>
                                )
                              ))}
                            </TableCell>
                            <TableCell>
                              {exercises.map((exercise, index) => (
                                typeof exercise === 'string' ? (
                                  ""
                                ) : (
                                  <div key={index}>{exercise.reps}</div>
                                )
                              ))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br></br>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="contained" onClick={() => setSubmitted(false)}>Generate Another Plan</Button>
                  <Button variant="contained" onClick={handleSavePlan}>Save Plan</Button>
                  </Box>
                </div>
              )
            )}
          </>
        ) : (
          <>
            {step === 0 && (
              <Box sx={{ my: 2 }}>
                <Typography variant="body1">Hi, I&apos;m your AI Fitness coach.</Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleNext}
                  sx={{ width: '100%', mt: 1 }}
                >
                  Create Plan
                </Button>
              </Box>
            )}
            {step > 0 && questions.slice(0, step).map((question, index) => (
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
                          control={<Radio/>}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
                {question.type === "height" && (
                  <>
                    <TextField
                      label="Feet"
                      id="heightFeet"
                      name="heightFeet"
                      type="number"
                      value={formData.heightFeet}
                      onChange={handleInputChange}
                      sx={{ mt: 1, mr: 1 }}
                      
                    />
                    <TextField
                      label="Inches"
                      id="heightInches"
                      name="heightInches"
                      type="number"
                      value={formData.heightInches}
                      onChange={handleInputChange}
                      sx={{ mt: 1}}
                      
                    />
                  </>
                )}
                {question.type === "number" && (
                  <TextField
                    label="Weight in lbs"
                    id="weight"
                    name="weight"
                    type="number"
                    value={formData.weight}
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
                              name="goals"
                              value={option}
                              checked={formData.goals.includes(option)}
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
                    <InputLabel htmlFor="muscleGroup" >Muscle groups</InputLabel>
                    <Select
                      id="muscleGroup"
                      name="muscleGroup"
                      value={formData.muscleGroup}
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
                {question.type === 'eq' && (
                  <>
                    <TextField
                      label="Equipment"
                      id="equipment"
                      name="Equipment"
                      type="text"
                      value={formData.Equipment}
                      variant="standard"
                      onChange={handleInputChange}
                      sx={{ mt: 1, mr: 1, width:500}}
                      
                    />
                  </>
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
                {step < questions.length ? (
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

export default Plan;