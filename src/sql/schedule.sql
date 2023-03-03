-- TODO CREATE TABLE SCHEDULE
-- CREATE TABLE IF NOT EXISTS schedule (
--     id BIGSERIAL PRIMARY KEY,
--     movie_id INTEGER,
--     date DATE NOT NULL,
--     location VARCHAR NOT NULL,
--     address VARCHAR,
--     theater VARCHAR NOT NULL,
--     price INTEGER,
--     created_at TIMESTAMP DEFAULT now(),
--     updated_at  TIMESTAMP,
--     CONSTRAINT fk_movie
--         FOREIGN KEY (movie_id)
--             REFERENCES movie (id)
-- );

-- TODO DELETE TABLE SCHEDULE
-- DROP TABLE schedule;

-- TODO INSERT SCHEDULE
-- INSERT INTO schedule (movie_id, date, location, address, theater, price)
-- VALUES (
--     '100', '2022-01-11', 'Purwokerto', 'jl. tentara pelajar', 'netflix', '35000'
-- )

-- SELECT * FROM schedule;
-- TODO GET DATA SCHEDULE
-- SELECT
-- s.id, movie_id, date, AS date, location, address, theater, price
-- FROM schedule AS s
-- INNER JOIN movie AS m
-- ON s.movie_id = m.id

-- TODO DELETE SCHEDULE
-- DELETE FROM schedule WHERE id=1

