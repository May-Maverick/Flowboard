SELECT
    b.id AS board_id, b.board_name, b.board_description,
    c.id AS column_id, c.column_name, c.position AS column_position, c.card_limit,
    ca.id AS card_id, ca.title AS card_title, ca.position AS card_position,
    ca.card_priority, ca.due_date, ca.assigned_to
FROM boards b
LEFT JOIN columns c ON c.board_id = b.id
LEFT JOIN cards ca ON ca.column_id = c.id
WHERE b.id = $1
ORDER BY c.position, ca.position;