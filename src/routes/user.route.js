import express from "express";
import { checkFields } from "../middlewares/checkFields.middleware.js";
import {
  forgetPassword,
  getAllUserData,
  login,
  logout,
  register,
  reset,
} from "../controllers/user.controller.js";
const router = express.Router();
// Remaining user authentication...
router.post("/register", checkFields(3), register);
router.get("/allusersdata", getAllUserData);
router.post("/login", checkFields(2), login);
router.put("/forget-password", checkFields(3), forgetPassword);
router.put("/reset", reset);
router.get("/logout", logout);

export default router;
