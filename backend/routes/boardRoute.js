import express from "express";
import { addBoard, fetchBoards, updateBoard, removeBoard } from "../controllers/boardController.js";
import asyncHandler from "../middleware/asyncHander.js";

const boardRouter = express.Router();

boardRouter.post("/", asyncHandler(addBoard));
boardRouter.get("/:id", asyncHandler(fetchBoards));
boardRouter.put("/:id", asyncHandler(updateBoard));
boardRouter.delete("/:id", asyncHandler(removeBoard));

export default boardRouter;