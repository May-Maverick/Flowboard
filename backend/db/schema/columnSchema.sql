DROP TABLE IF EXISTS columns;

CREATE TABLE columns (
    id SERIAL PRIMARY KEY,
    board_id INTEGER,
    column_name VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL,
    card_limit INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_board_id
        FOREIGN KEY (board_id)
        REFERENCES boards (id)
        ON DELETE CASCADE

)