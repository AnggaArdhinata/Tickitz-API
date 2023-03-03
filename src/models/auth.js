const auth = {}
const db = require('../configs/conDb')

auth.registerAuth = (first_name, last_name, email, password, phone, isadmin, image, verifyCode) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO users (first_name, last_name, email, password, phone, isadmin, image, verifyCode)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [first_name, last_name, email, password, phone, isadmin, image, verifyCode])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

auth.loginAuth = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email= $1',[email])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

auth.getAll = ({orderby, sortby}) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM  users ORDER BY ${orderby} ${sortby}`)
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

auth.chkVerifyCode = (verifyCode) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE verifyCode= $1', [verifyCode])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

auth.updateVerify = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE users SET isVerified = ${true} WHERE id= $1`,[id])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

auth.chkIsVerified = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE isVerified= false')
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

auth.deleteData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id= $1',[id])
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })

}

module.exports = auth