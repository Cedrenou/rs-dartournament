const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const connection = mongoose.connection
const app = express()

const playersRouter = require('./src/api/v1/players')
//const tournamentsRouter = require('./api/v1/tournaments')

app.set('port', (process.env.PORT || 3000))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

// Say HELLO
app.get('/', (req, res) => {
	res.send(JSON.stringify({Hello: 'World'}))
})

app.use('/api/v1', playersRouter)
//app.use('/api/v1', tournamentsRouter)
app.use((req, res) => {
	const err = new Error('404 - Not found !')
	err.status = 404
	res.json({msg: '404 Not Found !!', err: err})
})

const url = 'mongodb+srv://Cedric:DartDB@cluster0-ckd4d.mongodb.net/test?retryWrites=true&w=majority';
const devUri = 'mongodb://localhost:27017/dart-tournament'


mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
connection.on('error', (err) => {
	console.error(`Connection to mongoDB error : ${err.message}`)
})

connection.once('open', () => {
	console.log(`Connected to mongoDB base : ${url}`)
	app.listen(app.get('port'), () => {
		console.log(`express server listening on port ${app.get('port')} !!!`)
	})
})


module.exports.handler = serverless(app)
