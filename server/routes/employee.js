/* eslint-disable import/extensions */
const express = require("express");
const {
  createNewTask,
  deleteTask,
  getAllTasks,
  updateTask
} = require("../controllers/employee.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.post("/createtask", verifyToken, createNewTask);
router.get("/getalltasks", verifyToken, getAllTasks);
router.put("/updatetask", verifyToken, updateTask);
router.delete("/deletetask", verifyToken, deleteTask);

module.exports = router;