const middleware = {}
const jwt = require('jsonwebtoken')
const response = require('../helpers/response')

middleware.authentification = async (req, res, next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return response(res, 400, {msg: 'token required !'})
        }
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_KEYS)
        req.userData = decoded
        next()
    } catch (error) {
        return response(res, 500, error)
    }
}

middleware.roleAdmin = (req, res, next) => {
    try {
        const user = req.userData
        if (user.isadmin == true) {
            next()
        } else {
            return response(res, 401, {msg: 'you do not have access to this feature !'})
        }
    } catch (error) {
        return response(res, 500, error)
    }

}

module.exports = middleware