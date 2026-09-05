import pool from "../../config/database.js";

export const addUser = async (email, passwordHash, firstName, lastName) => {
    const query = "INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *";
    const response = await pool.query(query, [email, passwordHash, firstName, lastName]);
    return response.rows[0];
};

export const getUser = async (id) => {
    const query = "SELECT * FROM users WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
};