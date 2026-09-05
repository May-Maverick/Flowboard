import { signupUser } from "../controllers/signupControllers.js";
import express from "express";
import asyncHandler from "../middleware/asyncHander.js";
import generateToken from "../controllers/authController.js";

const signupRouter = express.Router();

signupRouter.post("/", asyncHandler(signupUser), generateToken);

export default signupRouter;