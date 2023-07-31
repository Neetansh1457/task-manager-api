const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes/tasks");
const PORT = 3000;

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome To The Task Manager!");
});

app.use("/tasks", tasksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log("The Server has been started successfully!");
});
