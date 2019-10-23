const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const connection = mongoose.connection
const app = express()

const playersRouter = require('./api/v1/players')
const tournamentsRouter = require('./api/v1/tournaments')

app.set('port', (process.env.port || 3000))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use('/api/v1', playersRouter)
app.use('/api/v1', tournamentsRouter)
app.use((req, res) => {
	const err = new Error('404 - Not found !')
	err.status = 404
	res.json({msg: '404 Not Found !!', err: err})
})

mongoose.connect('mongodb://localhost:27017/dart-tournament', {useUnifiedTopology: true, useNewUrlParser: true})
connection.on('error', (err) => {
	console.error(`Connection to mongoDB error : ${err.message}`)
})

connection.once('open', () => {
	console.log('Connected to mongoDB')
	app.listen(app.get('port'), () => {
		console.log(`express server listening on port ${app.get('port')} !!!`)
	})
})
