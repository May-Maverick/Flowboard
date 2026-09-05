DROP TABLE IF EXISTS cards;

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