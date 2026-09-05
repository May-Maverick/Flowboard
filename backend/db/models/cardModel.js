import pool from "../../config/database.js";

export const createCard = async (columnId, cardTitle, cardPosition, createdBy, assignedTo, cardPriority, cardDescription = "", dueDate="") => {

    const query = "INSERT INTO cards (column_id, title, card_description, position, created_by, assigned_to, due_date, card_priority) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
    const response = await pool.query(query, [columnId, cardTitle, cardDescription, cardPosition, createdBy, assignedTo, dueDate, cardPriority]);
    return response.rows[0];
}

export const editCard = async(cardId, attribute, value) => {
    
    let query;
    switch (attribute) {
        case "title" : {
            query = "UPDATE cards SET title = $1 WHERE id = $2 RETURNING *";
            break;
        }
        case "description" : {
            query = "UPDATE cards SET card_description = $1 WHERE id = $2 RETURNING *";
            break;
        }
        case "position" : {
            query = "UPDATE cards SET position = $1 WHERE id = $2 RETURNING *";
            break;
        }
        case "assign" : {
            query = "UPDATE cards SET assigned_to = $1 WHERE id = $2 RETURNING *";
            break;
        }
        case "due" : {
            query = "UPDATE cards SET due_date = $1 WHERE id = $2 RETURNING *";
            break;
        }
        case "priority" : {
            query = "UPDATE cards SET card_priority = $1 WHERE id = $2 RETURNING *";
            break;
        }
    }

    const response = await pool.query(query, [value, cardId]);
    return response.rows[0];
}

export const deleteCard = async(cardId) => {

    const query = "DELETE FROM cards WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [cardId]);
    return response.rows[0];
}