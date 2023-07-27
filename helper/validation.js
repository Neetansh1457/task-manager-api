const fs = require("fs");

function validation(req, tasksData, res) {
  const { taskID, title, description, flag } = req;

  // Validation checks
  if (!taskID || !title || !description || flag === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  } else if (tasksData.tasks.find((task) => task.taskID === taskID)) {
    return res.status(409).json({ error: "Task ID must be unique" });
  } else {
    const newTask = {
      taskID,
      title,
      description,
      flag,
    };

    tasksData.tasks.push(newTask);
    const updatedData = JSON.stringify(tasksData);

    fs.writeFile("tasks.json", updatedData, { encoding: "utf8" }, (err) => {
      if (!err) {
        return res.status(201).json(newTask);
      } else {
        return res.status(500).json({ Message: "Internal server error" });
      }
    });
  }
}

function validateID(req, tasksData) {
  const taskId = parseInt(req.params.id);
  const task = tasksData.tasks.find((task) => task.taskID === taskId);

  return task;
}

function validatePut(req, tasksData, res) {
  const taskId = parseInt(req.params.id);
  const { title, description, flag } = req.body;

  const taskToUpdateIndex = tasksData.tasks.findIndex(
    (task) => task.taskID === taskId
  );

  if (taskToUpdateIndex === -1) {
    res.status(404).json({ error: "Task not found" });
  } else {
    // Update the task properties
    tasksData.tasks[taskToUpdateIndex].title =
      title || tasksData.tasks[taskToUpdateIndex].title;
    tasksData.tasks[taskToUpdateIndex].description =
      description || tasksData.tasks[taskToUpdateIndex].description;
    tasksData.tasks[taskToUpdateIndex].flag =
      flag === undefined ? tasksData.tasks[taskToUpdateIndex].flag : flag;

    const updatedData = JSON.stringify(tasksData);

    // Save the updated tasksData to the file (optional, you may choose to persist data differently)
    fs.writeFile("tasks.json", updatedData, { encoding: "utf8" }, (err) => {
      if (!err) {
        res.status(200).json(tasksData.tasks[taskToUpdateIndex]);
      } else {
        res.status(500).json({ Message: "Internal server error" });
      }
    });
  }
}

function validateDelete(req, tasksData, res) {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasksData.tasks.findIndex((task) => task.taskID === taskId);

  if (taskIndex !== -1) {
    // Remove the task from tasksData.tasks
    tasksData.tasks.splice(taskIndex, 1);

    const updatedData = JSON.stringify(tasksData);
    fs.writeFile("tasks.json", updatedData, { encoding: "utf8" }, (err) => {
      if (!err) {
        res.status(200).json({ Message: "Task deleted successfully" });
      } else {
        res.status(500).json({ Message: "Internal server error" });
      }
    });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
}

module.exports = { validation, validateID, validatePut, validateDelete };
