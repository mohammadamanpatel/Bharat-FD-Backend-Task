import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/USER.controller.js";

const router = express.Router();

//routes for user registration,login,logout
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
