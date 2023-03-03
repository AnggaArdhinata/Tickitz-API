const schedules = {}
const db = require('../configs/conDb')

schedules.getAll = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT s.id, movie_id, title, TO_CHAR(date, 'Dy, DD MonthYYYY') AS TANGGAL,
        location, address, theater, price, s.updated_at, s.created_at
        FROM schedule AS s
        INNER JOIN movie AS m
        ON s.movie_id = m.id ORDER BY id DESC`)
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

schedules.getId = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT s.id, movie_id, title, TO_CHAR(date, 'Dy, DD MonthYYYY') AS DATE,
        location, address, theater, price, s.updated_at, s.created_at
        FROM schedule AS s
        INNER JOIN movie AS m
        ON s.movie_id = m.id WHERE s.id= $1`, [id])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

schedules.chkId = ({id}) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM schedule WHERE id= $1', [id])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


schedules.addSchedule = ({movie_id, date, location, address, theater, price}) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO schedule (movie_id, date, location, address, theater, price)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [movie_id, date, location, address, theater, price])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

schedules.updateSchedule = ({id, movie_id, date, location, address, theater, price}) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE schedule SET movie_id= $1, date= $2, location= $3, address= $4, theater= $5, price= $6, updated_at= now()
        WHERE id= $7`,
        [movie_id, date, location, address, theater, price, id])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

schedules.deleteSchedule = ({id}) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM schedule WHERE id= $1', [id])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

schedules.deleteAllSchedule = () => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM schedule')
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


module.exports = schedules