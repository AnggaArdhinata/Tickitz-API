-- ! CREATE TABLE
-- CREATE TABLE movie (
--     id BIGSERIAL PRIMARY KEY,
--     title VARCHAR NOT NULL,
--     genre VARCHAR,
--     director VARCHAR,
--     release_date DATE,
--     duration INTEGER,
--     casts VARCHAR,
--     description TEXT,
--     image VARCHAR,
--     created_at TIMESTAMP DEFAULT now(),
--     updated_at TIMESTAMP

-- );

-- ! DELETE TABLE
-- DROP TABLE IF EXISTS movie;

-- ! ADD VALUE TO TABLE
-- INSERT INTO movie (
--     title, release_date, description, created_at, updated_at)
--     VALUES ('Spiderman', '2o November 2020', 'test description', now(), now())

-- ! SHOW DATA FROM TABLE
-- SELECT * FROM movie;

-- SELECT COUNT(*) AS total FROM movie

-- SELECT * FROM movie LIMIT 10 OFFSET 1 * 