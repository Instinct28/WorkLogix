/* eslint-disable import/extensions */
const express = require("express");
const {
  employeeRegister,
  getAllEmployee,
  getEmployee
} = require("../controllers/admin.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.post("/employeeregister", verifyToken, employeeRegister);
router.get("/getAllEmployees", verifyToken, getAllEmployee);
router.get("/getEmployee/:employeeId", verifyToken, getEmployee);

module.exports = router;