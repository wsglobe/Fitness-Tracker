const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const db = require("./models");

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find(function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/workouts", ({ body }, res) => {
  const workout = body;

  db.Workout.create(workout, (error, saved) => {
    if (error) throw error;
    res.send(saved);
  });
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.update(
    {
      _id: mongoose.Types.ObjectId(req.params.id),
    },
    {
      $push: {
        exercises: req.body,
      },
    },
    (error, updated) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(updated);
        res.send(updated);
      }
    }
  );
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .populate("workouts")
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:%s/`, PORT);
});
