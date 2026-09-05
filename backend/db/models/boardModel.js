import pool from "../../config/database.js";

export const createBoard = async (workspaceId, boardName, createdBy, boardDescription = "") => {

    const query = "INSERT INTO boards (workspace_id, board_name, board_description, created_by) VALUES ($1,$2,$3,$4) RETURNING *";
    const response = await pool.query(query, [workspaceId, boardName, boardDescription, createdBy]);
    return response.rows[0];
}

export const editBoard = async (boardId, attribute, value) => {
    let query;
    switch (attribute) {
        case "name" : {
            query = "UPDATE boards SET board_name = $1 WHERE id = $2 RETURNING *";
            break;
        }
        case "description" : {
            query = "UPDATE boards SET board_description = $1 WHERE id = $2 RETURNING *";
            break;
        }
    }

    const response = await pool.query(query, [value, boardId]);
    return response.rows[0];
}

export const deleteBoard = async(boardId) => {
    
    const query = "DELETE FROM boards WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [boardId]);
    return response.rows[0];
}