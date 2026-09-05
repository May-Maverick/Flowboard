DROP TABLE IF EXISTS boards;

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

)