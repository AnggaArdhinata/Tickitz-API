-- TODO CREATE TABLE BOOK
-- CREATE TABLE IF NOT EXISTS book (
--     id BIGSERIAL PRIMARY KEY,
--     schedule_id INTEGER NOT NULL,
--     users_id integer NOT NULL,
--     seat VARCHAR NOT NULL,
--     created_at TIMESTAMP default now(),
--     updated_at TIMESTAMP,
--     CONSTRAINT fk_scheduleUser
--     FOREIGN KEY (schedule_id) REFERENCES schedule (id),
--     FOREIGN KEY  (users_id) REFERENCES users (id)
-- );

-- SELECT * FROM book INNER JOIN schedule USING (schedule_id)

-- TODO DELETE TABLE BOOK
-- DROP TABLE book;

-- TODO INSERT DATA BOOK
--  INSERT INTO book (schedule_id, cust_name, book_date, seat)
-- VALUES (
--     '7', 'angga ardhinata', '2022-12-27', 'C3'
-- )


--TODO SHOW DATA BOOK WITH JOIN
-- SELECT b.id, u.first_name ||' '|| u.last_name AS full_name, seat ,s.date ,m.title, m.duration, s.theater, s.price FROM book AS b
-- INNER JOIN schedule AS s  ON b.schedule_id = s.id
-- LEFT JOIN movie AS m ON s.movie_id = m.id
-- INNER JOIN users AS u  ON b.users_id = u.id

-- SELECT * FROM book
