const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models/Workout");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

//HTML ROUTES
app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/exercise?", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

//API ROUTES
app.get("/api/workouts", (req, res) => {
  db.find({})
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch(({ message }) => {
      console.log(message);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  const newEx = req.body;

  db.findOneAndUpdate(
    { _id: id },
    {
      $push: { exercises: newEx },
    },
    { new: true, safe: true, upsert: true }
  )
    .then((result) => {
      return res.status(201).json({
        status: "Success",
        message: "Resources Are Created Successfully",
        data: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "Failed",
        message: "Database Error",
        data: error,
      });
    });
});

app.post("/api/workouts", (req, res) => {
  console.log(req.body);
});

app.get("/api/workouts/range", (req, res) => {
  db.find({})
    .then((data) => {
      res.json(data);
    })
    .catch(({ message }) => {
      console.log(message);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
