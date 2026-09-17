DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS columns CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS workspaces CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255),
    profile_picture_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE workspaces (
    id SERIAL PRIMARY KEY,
    workspace_name VARCHAR(255),
    workspace_description VARCHAR(255),
    owner_id INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_owner_id
        FOREIGN KEY (owner_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    workspace_id INTEGER,
    board_name VARCHAR(255) NOT NULL,
    board_description VARCHAR(255),
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_workspace_id
        FOREIGN KEY (workspace_id)
        REFERENCES workspaces (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_created_by
        FOREIGN KEY (created_by)
        REFERENCES users (id)
        ON DELETE CASCADE

);

CREATE TABLE columns (
    id SERIAL PRIMARY KEY,
    board_id INTEGER,
    column_name VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL,
    column_type VARCHAR(20) NOT NULL DEFAULT 'todo'
    CHECK (column_type IN ('todo', 'in_progress', 'done', 'blocked')),
    card_limit INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_board_id
        FOREIGN KEY (board_id)
        REFERENCES boards (id)
        ON DELETE CASCADE

);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    column_id INTEGER,
    title VARCHAR(255) NOT NULL,
    card_description VARCHAR(255),
    position INTEGER NOT NULL,
    created_by INTEGER,
    assigned_to INTEGER,
    due_date TIMESTAMP,
    card_priority VARCHAR(255) CHECK(card_priority IN ('High', 'Medium', 'Low')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_column_id
        FOREIGN KEY (column_id)
        REFERENCES columns (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_created_by
        FOREIGN KEY (created_by)
        REFERENCES users (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_assigned_to
        FOREIGN KEY (assigned_to)
        REFERENCES users (id)
        ON DELETE CASCADE


);