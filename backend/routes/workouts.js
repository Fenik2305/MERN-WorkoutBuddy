const express = require("express");
const router = express.Router();

const Workout = require("../models/workoutModel.js");
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    deleteAllWorkouts
} = require("../controllers/workoutController.js");

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE workout
router.delete("/:id", deleteWorkout);

// DELETE all workouts
router.delete("/", deleteAllWorkouts);

// UPDATE workout
router.patch("/:id", updateWorkout);

module.exports = router;