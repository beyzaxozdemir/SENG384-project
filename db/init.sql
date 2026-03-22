CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL
);

INSERT INTO people (full_name, email)
VALUES ('Beyza', 'beyza@test.com');