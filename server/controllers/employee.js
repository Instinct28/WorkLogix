/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const dotenv = require("dotenv");
const User = require("../models/user.js");
const Task = require("../models/task.js");
const createError = require("../error.js");

dotenv.config();

// eslint-disable-next-line consistent-return
const createNewTask = async (req, res, next) => {
  try {
    // check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    // add the task id to the user's tasks array
    user.tasks.push(savedTask._id);
    const savedUser = await user.save();
    return res.status(200).json({
      message: "Task created successfully",
      user: savedUser
    });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

const updateTask = async (req, res, next) => {
  try {
    // check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // check if task exisit to that user
    if (!user.tasks.includes(req.body._id)) {
      return next(createError(404, "You can't update"));
    }

    // update the task
    const task = await Task.findByIdAndUpdate(req.body._id, req.body, {
      new: true
    }).exec();

    return res.status(200).json({
      message: "Task updated successfully",
      task
    });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.query;
    // check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // check if task exisit to that user
    if (!user.tasks.includes(taskId)) {
      return next(createError(404, "You can't delete"));
    }

    user.tasks.pop(taskId);
    await user.save();

    // delete the task
    await Task.findByIdAndDelete(req.body._id).exec();

    return res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const { id } = req.user;

    // check if user exists and is a employee
    const user = await User.findById(id).populate("tasks");
    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (user.role !== "employee") {
      return next(createError(401, "You are not authorized to view this page"));
    }

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: user.tasks
    });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

module.exports = {
    getAllTasks,
    deleteTask,
    updateTask,
    createNewTask
}