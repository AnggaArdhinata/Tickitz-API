require('dotenv').config()
const express = require('express')
const server = express()
const routers = require('./src/routers/index')
const db = require('./src/configs/conDb')
const cors = require('cors')

// TODO Test Endpoint
// server.get('/endpoint', (request, response) => {
//   response.send('app running')
// })
server.use(cors())
server.use('/image', express.static('public')) // TODO Get image to access from browser
// example path : http://localhost:8080/image/1672569478812.jpeg

server.use(express.json())
server.use(express.urlencoded({ extended: true}))
server.use('/tickitz/api/v1', routers)

db.connect()
.then(() => {
    console.log('Database successfully Connected !')
    server.listen(process.env.APP_PORT, () => {
        console.log(`Server Running on port ${process.env.APP_PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})

