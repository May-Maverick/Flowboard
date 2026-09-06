import pool from "../../config/database.js";

export const createWorkspace = async(workspaceName, workspaceOwner, workspaceDescription = "") => {

    const query = "INSERT INTO workspaces (workspace_name, workspace_description, owner_id) VALUES ($1, $2, $3) RETURNING *";
    const response = await pool.query(query, [workspaceName, workspaceDescription, workspaceOwner]);
    return response.rows[0];
}

export const getWorkspaces = async (ownerId) => {
    
    const query = "SELECT * FROM workspaces WHERE owner_id = $1";
    const response = await pool.query(query, [ownerId]);
    return response.rows || [];
}

export const deleteWorkspace = async(workspaceID) => {
    const query = "DELETE FROM workspaces WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [workspaceID]);
    return response.rows[0];
}

export const editWorkspace = async(workspaceID, attribute, value) => {
    let query;
    switch (attribute) {
        case "description": {
            query = "UPDATE workspaces SET workspace_description = $1 WHERE id = $2 RETURNING *";
            break;
        }
        case "name": {
            query = "UPDATE workspaces SET workspace_name = $1 WHERE id = $2 RETURNING *";
            break;
        }
    }

    const response = await pool.query(query, [value, workspaceID]);
    return response.rows[0];

}