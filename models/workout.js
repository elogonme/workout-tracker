const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: { 
      type: Date, 
      default: Date.now
    },

    exercises: [
      {
        _id: false,
        type: {
          type: String,
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

// WorkoutSchema.methods.totalDuration = function() {
//   let total = 0;
//   this.exercises.forEach(ex => total += ex.duration)
//   return total;
// };

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
