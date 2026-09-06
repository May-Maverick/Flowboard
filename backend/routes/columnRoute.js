import express from "express";
import { addColumn, fetchColumns, updateColumn, removeColumn } from "../controllers/columnController.js";
import asyncHandler from "../middleware/asyncHander.js";

const columnRouter = express.Router();

columnRouter.post("/", asyncHandler(addColumn));
columnRouter.get("/:id", asyncHandler(fetchColumns));
columnRouter.put("/:id", asyncHandler(updateColumn));
columnRouter.delete("/:id", asyncHandler(removeColumn))

export default columnRouter;