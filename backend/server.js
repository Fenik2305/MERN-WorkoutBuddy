require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts.js");
const userRoutes = require("./routes/user.js");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log(`connected to db and listening on localhost:${process.env.PORT}`)})
    })
    .catch((error) => {
        console.log(error);
    });

process.env;
