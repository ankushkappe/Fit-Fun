const express = require('express');
const router = express.Router();
const DietPlan = require('../models/Diet')

router.post('/saveDietPlan', async (req, res) => {
    try {
        const { DietaryPreference, plan } = req.body;
        const newPlan = new DietPlan({ DietaryPreference, plan });
        await newPlan.save();
        res.status(201).send(newPlan);
    } catch (error) {
        res.status(500).send({ error: 'Failed to save diet plan' });
    }
});

router.get('/getDietPlans', async (req, res) => {
    try {
        const dietPlans = await DietPlan.find();
        res.json(dietPlans);
    } catch (error) {
        console.error('Error fetching plans:', error); // Log the error
        res.status(500).send(error);
    }
});

module.exports = router;