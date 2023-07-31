const express = require("express");
const tasksData = require("../tasks.json");
const router = express.Router();
const {
  validation,
  validateID,
  validatePut,
  validateDelete,
} = require("../helper/validation");

// Get all the task
router.get("/", (req, res) => {
  res.status(200).json(tasksData.tasks);
});

// Get a single task based on ID provided
router.get("/:id", (req, res) => {
  const task = validateID(req, tasksData);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
  } else {
    res.status(200).json(task);
  }
});

// Get the task from the client
router.post("/", (req, res) => {
  validation(req.body, tasksData, res);
});

// Update an existing task by its ID.
router.put("/:id", (req, res) => {
  validatePut(req, tasksData, res);
});

// Delete a task by its ID.
router.delete("/:id", (req, res) => {
  validateDelete(req, tasksData, res);
});

module.exports = router;
