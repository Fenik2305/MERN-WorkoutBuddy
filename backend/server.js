require("dotenv").config();
process.env;

const express = require("express");
const workoutRoutes = require("./routes/workouts.js");

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

// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`listening on localhost:${process.env.PORT}`);
});