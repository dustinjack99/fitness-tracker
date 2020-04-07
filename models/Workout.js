const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  type: String,
  name: String,
  duration: Number,
  weight: Number,
  reps: Number,
  set: Number,
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
