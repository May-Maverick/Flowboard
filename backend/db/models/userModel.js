import pool from "../../config/database.js";

export const addUser = async (email, passwordHash, username, firstName, lastName) => {
    const query = "INSERT INTO users (email, password_hash, username,  first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const response = await pool.query(query, [email, passwordHash, username, firstName, lastName]);
    return response.rows[0];
};

export const getUser = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const response = await pool.query(query, [email]);
    return response.rows[0];
};