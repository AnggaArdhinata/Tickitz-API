const ctrl = {}
const models = require('../models/schedule')
const response = require('../helpers/response')

ctrl.getAllData = async (req, res) => {
    try {
        const result = await models.getAll()
        if (result.length <=0) {
            return response(res, 404, 'sorry data not found !')
        } else {
            return response(res, 200, result)
        }
        
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.getByScheduleId = async (req, res) => {
    try {
        const {id} = req.params
        const result = await models.getId(id)
        if (result.length <=0) {
            return response(res, 404, 'sorry data not found !')
        } else {
            return response(res, 200, result)
        }
        
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.addData = async (req, res) => {
    try {
        const {movie_id, date, location, address, theater, price} = req.body
        const result = await models.addSchedule({movie_id, date, location, address, theater, price})
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.updateSchedule = async (req, res) => {
    try {
        const {id} = req.params
        const {movie_id, date, location, address, theater, price} = req.body
        const result = await models.updateSchedule({id, movie_id, date, location, address, theater, price})
        if (result.length <= 0) {
            return response(res, 200, `data schedule id'${id}' successfully updated !`)
        }
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.deleteByIdSchedule = async (req, res) => {
    try {
        const {id} = req.params
        const result = await models.deleteSchedule({id})
        if (result.length <=0) {
            return response(res, 200, `data '${id}' successfully deleted !`)
        }
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.deleteAll = async (req, res) => {
    try {
        const result = await models.deleteAllSchedule()
        if (result.length <=0){
            return response(res, 200, 'all data has been deleted !')
        }
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = ctrl