import express from "express";
import login from "../controllers/loginControllers.js";
import asyncHandler from "../middleware/asyncHander.js"
import generateToken from "../controllers/authController.js"

const loginRouter = express.Router();

loginRouter.post("/", asyncHandler(login), generateToken);

export default loginRouter;