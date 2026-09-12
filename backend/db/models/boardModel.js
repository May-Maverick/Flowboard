import pool from "../../config/database.js";

export const createBoard = async (workspaceId, boardName, createdBy, boardDescription = "") => {

    const query = "INSERT INTO boards (workspace_id, board_name, board_description, created_by) VALUES ($1,$2,$3,$4) RETURNING *";
    const response = await pool.query(query, [workspaceId, boardName, boardDescription, createdBy]);
    return response.rows[0];
}

export const getBoards = async (workspaceId) => {
    
    const query = "SELECT * FROM boards WHERE workspace_id = $1";
    const response = await pool.query(query, [workspaceId]);
    return response.rows || [];
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

export const getFullBoard = async (boardId) =>  {
    const query = `SELECT
    b.id AS board_id, b.board_name, b.board_description,
    c.id AS column_id, c.column_name, c.position AS column_position, c.card_limit,
    ca.id AS card_id, ca.title AS card_title, ca.position AS card_position,
    ca.card_priority, ca.due_date, ca.assigned_to
    FROM boards b
    LEFT JOIN columns c ON c.board_id = b.id
    LEFT JOIN cards ca ON ca.column_id = c.id
    WHERE b.id = $1
    ORDER BY c.position, ca.position`;

    const response = await pool.query(query, [boardId]);

    return response.rows || [];


}