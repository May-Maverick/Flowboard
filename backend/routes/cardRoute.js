import express from "express";
import { addCard, fetchCards, updateCard, removeCard } from "../controllers/cardController.js";
import asyncHandler from "../middleware/asyncHander.js";

const cardRouter = express.Router();

cardRouter.post("/", asyncHandler(addCard));
cardRouter.get("/:id", asyncHandler(fetchCards));
cardRouter.put("/:id", asyncHandler(updateCard));
cardRouter.delete("/:id", asyncHandler(removeCard));

export default cardRouter;