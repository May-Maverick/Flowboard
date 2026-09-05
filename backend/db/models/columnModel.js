import pool from "../../config/database.js";

export const createColumn = async (boardId, columnName, columnPosition, cardLimit = 100) => {
    
    const query = "INSERT INTO columns (board_id, column_name, position, card_limit) VALUES ($1,$2,$3,$4) RETURNING *";
    const response = await pool.query(query, [boardId, columnName, columnName, cardLimit]);
    return response.rows[0];
}

export const editColumn = async (columnId, attribute, value) => {
    let query;
    switch (attribute) {
        case "name" : {
            query = "UPDATE columns SET column_name = $1 WHERE id = $2 RETURNING *";
            break;
        }
        case "position" : {
            query = "UPDATE columns SET position = $1 WHERE id = $2 RETURNING *";
            break;
        }
        case "limit" : {
            query = "UPDATE columns SET card_limit = $1 WHERE id = $2 RETURNING *";
            break;
        }

    }
    const response = await pool.query(query, [value, columnId]);
    return response.rows[0];

}

export const deleteColumn = async (columnId) => {

    const query = "DELETE FROM columns WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [columnId]);
    return response.rows[0];
}