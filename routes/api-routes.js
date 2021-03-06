const router = require('express').Router();
const Workout = require('../models/workout.js');

// Get all workouts route and adding totalDuration
router.get('/api/workouts', (req, res) => {
  Workout.aggregate([{ $set: { totalDuration: { $sum: '$exercises.duration' }}}])
    .sort({ day: 1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Create workout route
router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Add exercise to workout route
router.put('/api/workouts/:id', ({ body, params }, res) => {
  Workout.findOneAndUpdate({ _id: params.id }, { $push: { exercises: body } }, { new: true })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Get range of last seven workouts route
router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([{ $set: { totalDuration: { $sum: '$exercises.duration' } } }])
    .sort({ day: -1 })
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// save exercises in bulk if app was offline
router.post('/api/workouts-bulk', ( { body }, res) => {
  Workout.findByIdAndUpdate(body[0].id, { $push: { exercises: { $each: body }}})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
