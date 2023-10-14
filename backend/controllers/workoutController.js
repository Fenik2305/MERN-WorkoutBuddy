const Workout = require("../models/workoutModel.js");
const mongoose = require("mongoose");

// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
};

// GET a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout."});
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({error: "No such workout."});
    }

    res.status(200).json(workout);
};

// POST a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }

    if (!load) {
        emptyFields.push('load');
    }

    if (!reps) {
        emptyFields.push('reps');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields.', emptyFields });
    }

    // try to push to the db
    try {
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout."});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if (!workout) {
        return res.status(400).json({error: "No such workout."});
    }

    res.status(200).json(workout);
};

// DELETE all workouts
const deleteAllWorkouts = async (req, res) => {
    const workouts = await Workout.deleteMany({});
    res.status(200).json(workouts);
};

// UPDATE workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout."});
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!workout) {
        return res.status(404).json({error: "No such workout."});
    }

    res.status(200).json(workout);
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    deleteAllWorkouts
}