const mongoose = require('mongoose');

const WorkoutPlan = new mongoose.Schema({
    muscleGroup: String,
    isArchived: {
        type: Boolean,
        default: false
    },
    plan: Object
});

module.exports = mongoose.model("WorkoutPlan", WorkoutPlan);
