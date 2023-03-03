-- TODO CREATE TABLE USER
-- CREATE TABLE IF NOT EXISTS users (
--     id BIGSERIAL PRIMARY KEY,
--     first_name VARCHAR,
--     last_name VARCHAR,
--     email VARCHAR,
--     password VARCHAR,
--     phone VARCHAR,
--     isAdmin BOOLEAN DEFAULT false,
--     image VARCHAR,
--     isVerified BOOLEAN DEFAULT false,
--     verifyCode VARCHAR,
--     created_at TIMESTAMP DEFAULT now(),
--     updated_at TIMESTAMP
-- );

-- TODO INSERT USERS
-- INSERT INTO users (first_name, last_name, email, password, phone, isAdmin, image)
-- VALUES ('Angga', 'Ardhinata', 'ardhinata@gmail.com', 'angga123', '08563636364', 'true', 'image');

-- TODO DELETE TABLE
-- DROP TABLE users;

-- TODO SELECT
SELECT * FROM users WHERE isVerified = false;