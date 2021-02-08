const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: { 
      type: Date, 
      default: Date.now
    },

    exercises: [
      {
        type: {
          enum: [ "resistance", "cardio" ],
          description: "Can only be one of the enum values and is required"},
        name: {
          type: String,
          trim: true,
          required: "Exercise name is Required",
        },
        duration: {
          type: Number,
          default: 20
        },
        weight: {
          type: Number,
          default: 5
        },
        reps: { 
          type: Number,
          default: 5
        },
        sets: {
          type: Number,
          default: 3
        }
      }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
