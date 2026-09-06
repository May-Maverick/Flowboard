import express from "express";
import { addWorkspace, fetchWorkspaces, updateWorkspace, removeWorkspace } from "../controllers/workspaceController.js";
import asyncHandler from "../middleware/asyncHander.js";

const workspaceRouter = express.Router();

workspaceRouter.post("/", asyncHandler(addWorkspace));
workspaceRouter.get("/", asyncHandler(fetchWorkspaces));
workspaceRouter.put("/:id", asyncHandler(updateWorkspace));
workspaceRouter.delete("/:id", asyncHandler(removeWorkspace));

export default workspaceRouter;