const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/auth')
const upload = require('../middlewares/uploadImage')
const {authentification, roleAdmin} = require('../middlewares/jwt')

routers.get('/users',authentification, roleAdmin, ctrl.getAllUser)
routers.get('/verify/:verifyCode', ctrl.verify)
routers.post('/register',upload.file, ctrl.register)
routers.post('/login', ctrl.login)
routers.delete('/:id', ctrl.deleteUserId)


module.exports = routers