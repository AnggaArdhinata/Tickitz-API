const ctrl = {}
const models = require('../models/book')
const schedule = require('../models/schedule')
const response = require('../helpers/response')

ctrl.getAllBook = async (req, res) => {
    try {
        const result = await models.getAll()
        if (result.length <=0) {
            return response(res, 404, 'sorry data not found !')
        } else {
            for (i = 0; i < result.length; i++) {
                const hour = Math.floor(result[i].duration / 60)
                const minute = result[i].duration % 60
                result[i].duration = hour + ' hour' +' '+ minute + ' minute'
            }
            return response(res, 200, result)
        }
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.getByBookingId = async (req, res) => {
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

ctrl.insertBook = async (req, res) => {
    try {
        const {schedule_id, seat} = req.body
        const idUser = req.userData.id
        const chkschedule = await schedule.chkId({id:schedule_id})
        const found = chkschedule[0]
        if (!found) {
            return response(res, 404, {msg: 'movie schedule not found !'})
        }
        const result = await models.addBook({schedule_id, users_id: idUser, seat})
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }

}

ctrl.updateDataBook = async (req, res) => {
    try {
        const {id} = req.params
        const chkid = await models.getId(id)
        if (chkid.length <= 0) {
            return response(res, 404, {msg: 'id booking not found !'})
        }
        const {schedule_id, seat} = req.body
        const idUser = req.userData.id
        const chkschedule = await schedule.chkId({id:schedule_id})
        const found = chkschedule[0]
        if (!found) {
            return response(res, 404, {msg: 'movie schedule not found !'})
        }
        const result = await models.updateBook({id, schedule_id, users_id: idUser, seat})
        if (result.length <= 0) {
            return response(res, 200, `data booking id'${id}' successfully updated !`)
        }
    } catch (error) {
        return response(res, 500, error) 
    }

}

ctrl.deleteBookById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await models.deleteBook({id})
        if (result.length <=0) {
            return response(res, 200, `data '${id}' successfully deleted !`)
        }
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error) 
    }

}

ctrl.deleteAllDataBook = async (req, res) => {
    try {
        const result = await models.deleteAll()
        if (result.length <=0){
            return response(res, 200, 'all data has been deleted !')
        }
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error) 
    }

}

module.exports = ctrl