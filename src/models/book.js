const book = {}
const db = require('../configs/conDb')

book.getAll = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT b.id, u.first_name ||' '|| u.last_name AS customer_name, seat ,s.date ,m.title, m.duration, s.theater, s.price FROM book AS b
        INNER JOIN schedule AS s  ON b.schedule_id = s.id
        LEFT JOIN movie AS m ON s.movie_id = m.id
        INNER JOIN users AS u  ON b.users_id = u.id ORDER BY id DESC`)
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })  
}

book.getId = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT b.id, u.first_name ||' '|| u.last_name AS customer_name, seat ,s.date ,m.title, m.duration, s.theater, s.price FROM book AS b
        INNER JOIN schedule AS s  ON b.schedule_id = s.id
        LEFT JOIN movie AS m ON s.movie_id = m.id
        INNER JOIN users AS u  ON b.users_id = u.id WHERE b.id= $1 ORDER BY id DESC`, [id])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })  
}

book.addBook = ({schedule_id, users_id, seat}) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO book (schedule_id, users_id, seat)
        VALUES ($1, $2, $3) RETURNING *`,
            [schedule_id, users_id, seat])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

book.updateBook = ({schedule_id, users_id, seat, id}) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE book SET schedule_id= $1, users_id= $2, seat= $3
        WHERE id= $4`,
        [schedule_id, users_id, seat, id])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

book.deleteBook = ({id}) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM book WHERE id= $1', [id])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

book.deleteAll = () => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM book')
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = book


