const express = require('express')
const routers = express.Router()
const bookctrl = require('../controllers/book')
const {authentification} = require('../middlewares/jwt')

routers.get('/', bookctrl.getAllBook)
routers.get('/:id', bookctrl.getByBookingId)
routers.post('/', authentification, bookctrl.insertBook)
routers.put('/:id', authentification, bookctrl.updateDataBook)
routers.delete('/:id', bookctrl.deleteBookById)
routers.delete('/', bookctrl.deleteAllDataBook)

module.exports = routers