const ctrl = {}
const movie = require('../models/movie')
const response = require('../helpers/response')

ctrl.getData = async (req, res) => {
    try {
        //TODO Data diberikan ternary operator untuk memberikan nilai default jika tidak diisi
        const {orderby, sortby, page, limit} = req.query
        const order = orderby ? (orderby) : 'id'
        const sort = sortby ? (sortby) : 'desc'
        const pageVal = page ? parseInt(page) : 1 // ! Nilai di konversi dari string ke integer menggunakan parseInt
        const limitVal = limit ? parseInt(limit) : 5
        const offset = pageVal == 1 ? 0 : limitVal * (pageVal - 1)
        const result = await movie.getAll({orderby: order, sortby: sort, limit: limitVal, offset})

    // TODO merubah format durasi dari integer ke format durasi jam dan menit
        for (i = 0; i < result.length; i++) {
            const hour = Math.floor(result[i].duration / 60) // ! membulatkan ke bawah
            const minute = result[i].duration % 60
            result[i].duration = hour + ' hour' +' '+ minute + ' minute'
        }

        const count = await movie.totalPg()
        const total = parseInt(count[0].total)
        const pageInfo = {
            current_page : pageVal,
            item_on_page: limitVal,
            total_page: Math.ceil(total/limitVal) // ! Membulatkan ke atas
        }
        return response(res, 200, {
            data : result,
            page_info: pageInfo
        })
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.getDataName = async (req, res) => {
    try {
        const title = req.params.title
        const result = await movie.getByName(title)
        if (result.length <= 0) {
            return response(res, 404, 'sorry data not found !')
        } else {
        return response(res, 200, result)
        }
    } catch (error) {
        console.log(error)
        return response(res, 500, error)
    }
}

ctrl.getId = async (req, res) => {
    try {
        const id = req.params.id
        const result = await movie.getById(id)
        if (result.length <= 0) {
            return response(res, 404, 'sorry data not found !')
        } else {
        return response(res, 200, result)
        }
    } catch (error) {
        console.log(error)
        return response(res, 500, error)
    }
}


ctrl.addData = async (req, res) => {
    try {
        const {title, genre, director, release_date, casts, description, image} = req.body
        const result = await movie.addMovie({title, genre, director, release_date, casts, description, image})
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

ctrl.updateData = async (req, res) => {
    try {
        const {id} = req.params
        const {title, genre, director, release_date, casts, description, image} = req.body
        const result = await movie.updateMovie({id, title, genre, director, release_date, casts, description, image})
        if (result.length <= 0) {
            return response(res, 200, `data movie id'${id}' successfully updated !`)
        }
        return response(res, 200, result)
    } catch (error) {
        res.send(error)
    }
}


ctrl.hardDeleteData = async (req, res) => {
    try {
        const id = req.params.id
        const result = await movie.hardDelete({id})
        if (result.length <= 0) {
            return response(res, 200, `data '${id}' successfully deleted !`)
        }
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 200, result)
    }
}

ctrl.deleteAllData = async (req, res) => {
    try {
        const result = await movie.deleteAll()
        if (result.length <= 0){
            return response(res, 200, 'all data has been deleted !')
        }
    return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error)
    }
}

module.exports = ctrl