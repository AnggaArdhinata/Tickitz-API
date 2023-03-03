const express = require('express')
const routers = express.Router()

const movie = require('../routers/movie')
const schedule = require('../routers/schedule')
const booking = require('../routers/book')
const auth = require('./auth')

routers.use('/auth', auth)// todo MAIN ROUTE auth/ user
routers.use('/movie', movie) // todo MAIN ROUTE MOVIE
routers.use('/schedule', schedule) // todo MAIN ROUTE SCHEDULE
routers.use('/book', booking) // todo MAIN ROUTE BOOK

module.exports = routers