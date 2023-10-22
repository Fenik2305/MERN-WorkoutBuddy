const express = require("express");

const Workout = require("../models/workoutModel.js");
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    deleteAllWorkouts
} = require("../controllers/workoutController.js");

const requireAuth = require('../middleware/requireAuth.js')
const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)

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