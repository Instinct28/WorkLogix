const express = require("express");
const {
  adminRegister,
  adminLogin,
  employeeLogin,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
  findUserByEmail,
  updatePassword,
  updateProfile
} = require("../controllers/auth.js");
const localVariables = require("../middlewares/verifyEmail.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.post("/admin/register", localVariables, adminRegister);
router.post("/admin/login", adminLogin);
router.get("/admin/generateotp", localVariables, generateOTP);
router.get("/admin/verifyotp", verifyOTP);
router.get("/admin/createResetSession", createResetSession);
router.put("/admin/forgetpassword", resetPassword);
router.post("/employee/login", employeeLogin);
router.get("/admin/findbyemail", findUserByEmail);
router.put("/updatepassword", verifyToken, updatePassword);
router.put("/updateprofile", verifyToken, updateProfile);

module.exports = router;