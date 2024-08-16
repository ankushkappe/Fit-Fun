const mongoose = require('mongoose');

const DietPlan = new mongoose.Schema({
    DietaryPreference: String,
    plan: Object
});

module.exports = mongoose.model("DietPlan", DietPlan);
