const Workout = require("../Develop/models/exercise.js.js");

module.exports = function (app) {
  // add find app.post
  app.get("/api/workouts", (req, res) => {
    Workout.find({})
      .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  app.post("/api/workouts", (req, res) => {
    Workout.create({})
      .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  //update to find by ID here
  app.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
