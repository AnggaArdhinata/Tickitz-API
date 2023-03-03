const express = require('express')
const routers = express.Router()
const scheduleCtrl = require('../controllers/schedule')

routers.get('/', scheduleCtrl.getAllData) //todo GET ALL DATA
routers.get('/:id', scheduleCtrl.getByScheduleId) // TODO GET BY SCHEDULE ID
routers.post('/', scheduleCtrl.addData) //TODO ADD DATA SCHEDULE
routers.put('/:id', scheduleCtrl.updateSchedule) //TODO UPDATE DATA SCHEDULE
routers.delete('/:id', scheduleCtrl.deleteByIdSchedule) //TODO DELETE BY ID
routers.delete('/', scheduleCtrl.deleteAll) //TODO DELETE ALL DATA ON TABLE SCHEDULE


module.exports = routers