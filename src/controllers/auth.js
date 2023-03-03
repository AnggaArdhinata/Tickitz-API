const ctrl = {}
const crypto = require('crypto')
const models = require('../models/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const response = require('../helpers/response')
const sendMail = require('../configs/mailConfig')
const fs = require('fs')

ctrl.register = async (req, res) => {
    try {
        const {first_name, last_name, email, password, phone, isadmin} = req.body
        if (req.file == undefined) {
            return response(res, 400, 'Please upload your image file') 
        }
        const image = req.file.filename
        if (email <= 0)  {
            fs.unlinkSync(`public/${image}`)
            return response(res, 400, {msg: 'email can not be empty !'})
        }
        const chkEmail = await models.loginAuth(email)
        if (chkEmail.length > 0) {
            fs.unlinkSync(`public/${image}`)
            return response(res, 400, {msg: 'email already exist !'} )
        }

        const verifyCode = crypto.randomBytes(10).toString('hex')
        const txt = 'verification'
        const link = `<P>Please Click Link Below to Verify Your Email</P>
        <a href="${process.env.BASE_URL}/auth/verify/${verifyCode}">Please click to verify your email</a>`
        await sendMail(email, 'Verify Mail Tickitz Movie', txt, link)

        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        await models.registerAuth(first_name, last_name, email, hash, phone, isadmin, image, verifyCode)
        return response(res, 201, {msg: 'register success, please check your email confirmation !'})
    } catch (error) {
        console.log(error)
        return response(res, 500, error)
        
    }
}

ctrl.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const chkEmailAuth = await models.chkIsVerified()
        if (chkEmailAuth.length > 0){
            return response(res, 401, {msg: 'please verify email !'})
        }

        const result = await models.loginAuth(email)
        const user = result[0]
        if (!user) {
            return response(res, 401, {msg: 'username/ email salah !'})
        }
        const compared = bcrypt.compareSync(password, user.password)
        if (!compared) {
            return response(res, 401, {msg: 'password salah !'})
        }
        // delete user.password // TODO agar tidak menampilkan field password di respon json
        const token = `Bearer ${jwt.sign(user, process.env.JWT_KEYS, {expiresIn: '1h'})}`
        const data = {
            user,
            token
        }
        return response(res, 200, {data, msg: 'successfully login !'})
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.verify = async (req, res) => {
    try {
        const {verifyCode} = req.params
        const result = await models.chkVerifyCode(verifyCode)
        if (result.length > 0 ) {
            await models.updateVerify(result[0].id)
            return response(res, 200, {msg: 'Your email has been verified !'})
        } else {
            return response(res, 400, {msg: 'invalid verify code, please insert a valid code !'})
        }
        
    } catch (error) {
        response(res, 500, error)
    }
}

ctrl.getAllUser = async (req, res) => {
    try {
        const {orderby, sortby} = req.query
        const order = orderby ? (orderby) : 'id' // TODO Ternary operator untuk set nilai default jika tidak diisi value
        const sort = sortby ? (sortby) : 'desc'
        const result = await models.getAll({orderby: order, sortby: sort})
        if (result.length <= 0) {                 // TODO Error handling jika data ny tidak ditemukan
            return response(res, 404, {msg: 'data not found !'})
        }
        for (let i = 0; i < result.length; i++) { // TODO Menghapus response password agar tidak tampil di response
            result[i].password = 'secret'
        }
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error)
    }
}

ctrl.deleteUserId = async (req, res) => {
    try {
        const {id} = req.params
        await models.deleteData(id)
        return response(res, 200, `data id ${id} successfully deleted !`)
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = ctrl