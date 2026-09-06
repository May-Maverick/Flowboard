import { createWorkspace, getWorkspaces, editWorkspace, deleteWorkspace } from "../db/models/workspaceModel.js";
import throwError from "../middleware/throwError.js";

export const addWorkspace = async (req, res) => {

    const {workspaceName, workspaceDescription} = req.body;

    if(!workspaceName) {
        throwError(400, "Incomplete fields");
    }
    const workspaceOwner = req.userId;

    const workspace = await createWorkspace(workspaceName, workspaceOwner, workspaceDescription);

    if(!workspace) {
        throwError(501, "Failed to create workspace");
    }

    res.status(201).json();
}

export const fetchWorkspaces = async (req, res) => {

    const ownerId = req.userId;

    const workspaces = await getWorkspaces(ownerId);

    if(!workspaces) {
        throwError(501, "Failed to fetch workspaces");
    }

    res.status(200).json(workspaces);
}

export const updateWorkspace = async (req, res) => {

    const workspaceId = req.params.id;
    let workspace;

    if(!workspaceId) {
        throwError(400, "No workspace Id");
    }

    const attributeArr = Object.entries(req.body);

    for(const [key, value] of attributeArr) {
        workspace = await editWorkspace(workspaceId, key, value);
    }

    if(!workspace) {
        throwError(501, "Failed to update workspace");
    }

    res.status(200).json();
}

export const removeWorkspace = async (req, res) => {
    const workspaceId = req.params.id;

    if(!workspaceId) {
        throwError(400, "No workspace Id");
    }

    const workspace = await deleteWorkspace(workspaceId);

    if(!workspace) {
        throwError(501, "Failed to delete workspace");
    }

    res.status(200).json();
}