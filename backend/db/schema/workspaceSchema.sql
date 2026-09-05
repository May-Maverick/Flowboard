DROP TABLE IF EXISTS workspaces;

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