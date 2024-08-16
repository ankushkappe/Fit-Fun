const express = require('express');
const router = express.Router();
const WorkoutPlan = require('../models/Workout')

router.post('/saveWorkoutPlan', async (req, res) => {
    try {
      const { muscleGroup, plan } = req.body;
      const newPlan = new WorkoutPlan({ muscleGroup, plan });
      await newPlan.save();
      res.status(201).send(newPlan);
    } catch (error) {
      res.status(500).send({ error: 'Failed to save workout plan' });
    }
});

router.get('/getWorkoutPlans', async (req, res) => {
  try {

    const workoutPlans = await WorkoutPlan.find({ isArchived: false }); // Only get Plans which are not Archived
    res.json(workoutPlans);
  } catch (error) {
    console.error('Error fetching plans:', error); // Log the error
    res.status(500).send(error);
  }
});

// Archive a workout plan
router.post('/archiveWorkoutPlan', async (req, res) => {
  const { planId } = req.body;

  try {
    const plan = await WorkoutPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    plan.isArchived = true;
    await plan.save();

    res.json({ message: 'Workout plan archived successfully' });
  } catch (error) {
    console.error('Error archiving plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all archived workout plans
router.get('/getArchivedPlans', async (req, res) => {
  try {
    const archivedPlans = await WorkoutPlan.find({ isArchived: true });
    res.json(archivedPlans);
  } catch (error) {
    console.error('Error fetching archived plans:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;