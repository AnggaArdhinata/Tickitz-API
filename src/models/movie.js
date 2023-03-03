const movies = {}
const db = require('../configs/conDb')

movies.getAll = ({orderby, sortby, limit, offset}) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM movie ORDER BY ${orderby} ${sortby} LIMIT ${limit} OFFSET ${offset} `)
    .then((res) => {
        resolve(res.rows)
    })
    .catch((err) => {
        reject(err)
    })
    })
}

movies.getByName = (title) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line quotes
        db.query(`SELECT * FROM movie WHERE title ILIKE '%'||$1||'%'`, [title])
    .then((res) => { 
        resolve(res.rows)
    })
    .catch((err) => {
        reject(err)
    })
    })
}

movies.getById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM movie WHERE id= $1', [id])
    .then((res) => {
        resolve(res.rows)
    })
    .catch((err) => {
        reject(err)
    })
    })
}

movies.addMovie = ({ title, genre, director, release_date, casts, description, image }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.movie (title, genre, director, release_date, casts, description, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [title, genre, director, release_date, casts, description, image])
    .then((res) => {
        resolve(res.rows)
    })
    .catch((err) => {
        reject(err)
    })
    })
}

movies.updateMovie = ({ id, title, genre, director, release_date, casts, description, image }) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE public.movie SET 
        title= $1, genre= $2, director= $3, release_date= $4, casts= $5, description= $6, image= $7, updated_at= now()
        WHERE id= ${id} RETURNING *;`, [title, genre, director, release_date, casts, description, image])
    .then((res) => {
        resolve(res.rows)
    })
    .catch((err) => {
        reject(err)
    })
    })
}


movies.hardDelete = ({id}) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM movie WHERE id= $1', [id])
        .then((res) => {
        resolve(res.rows)
        })
        .catch((err) => {
        reject(err)
        })
    })
}

movies.deleteAll = () => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM movie')
    .then((res) => {
        resolve(res.rows)
    })
    .catch((err) => {
        reject(err)
    })
    })
}

movies.totalPg = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS total FROM movie')
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = movies