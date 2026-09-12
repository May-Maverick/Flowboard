-- seed.sql
-- Run once against your kanban database, e.g.:
--   psql -d your_db_name -f seed.sql
--
-- Uncomment the block below if you want a clean slate before reseeding
-- (CASCADE also wipes boards/columns/cards/workspaces tied to these users):
--
-- TRUNCATE users, workspaces, boards, columns, cards RESTART IDENTITY CASCADE;

BEGIN;

WITH new_user AS (
    INSERT INTO users (email, password_hash, first_name, last_name, username)
    VALUES ('may@test.com', 'placeholder_hash', 'May', 'Maverick', 'maymaverick')
    RETURNING id
),
new_workspace AS (
    INSERT INTO workspaces (workspace_name, workspace_description, owner_id)
    SELECT 'May''s Workspace', 'Test workspace', id FROM new_user
    RETURNING id
),
new_board AS (
    INSERT INTO boards (workspace_id, board_name, board_description, created_by)
    SELECT new_workspace.id, 'Sprint Board', 'Test board for cascading fetch', new_user.id
    FROM new_workspace, new_user
    RETURNING id
),
col_todo AS (
    INSERT INTO columns (board_id, column_name, position, card_limit)
    SELECT id, 'To Do', 0, 10 FROM new_board
    RETURNING id
),
col_inprogress AS (
    INSERT INTO columns (board_id, column_name, position, card_limit)
    SELECT id, 'In Progress', 1, 5 FROM new_board
    RETURNING id
),
-- Deliberately left with zero cards below, to exercise the LEFT JOIN null case
col_done AS (
    INSERT INTO columns (board_id, column_name, position, card_limit)
    SELECT id, 'Done', 2, 20 FROM new_board
    RETURNING id
),
cards_todo AS (
    INSERT INTO cards (column_id, title, card_description, position, created_by, card_priority)
    SELECT col_todo.id, v.title, v.description, v.pos, new_user.id, v.priority
    FROM col_todo, new_user,
    (VALUES
        ('Set up database schema', 'Initial tables', 0, 'High'),
        ('Write seed data', 'For testing joins', 1, 'Medium')
    ) AS v(title, description, pos, priority)
    RETURNING id
),
cards_inprogress AS (
    INSERT INTO cards (column_id, title, card_description, position, created_by, card_priority)
    SELECT col_inprogress.id, 'Build cascading fetch endpoint', 'Board + columns + cards', 0, new_user.id, 'High'
    FROM col_inprogress, new_user
    RETURNING id
)
SELECT 'Seed complete' AS status;

COMMIT;