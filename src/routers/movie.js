const express = require('express')
const routers = express.Router()
const movieCtrl = require('../controllers/movie')

routers.get('/', movieCtrl.getData) // todo GET ALL DATA MOVIE
routers.get('/search/:title', movieCtrl.getDataName) // todo SEARCH MOVIE BY TITLE
routers.get('/id/:id', movieCtrl.getId) // todo GET BY ID MOVIE
routers.post('/', movieCtrl.addData) // todo POST DATA MOVIE
routers.put('/:id', movieCtrl.updateData) // todo UPDATE DATA MOVIE
routers.delete('/:id', movieCtrl.hardDeleteData) // todo DELETE BY ID
routers.delete('/', movieCtrl.deleteAllData) // todo DELETE ALL DATA ON TABLE MOVIE

module.exports = routers