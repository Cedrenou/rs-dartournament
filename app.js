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

// Say HELLO
app.get('/', (req, res) => {
	res.send(JSON.stringify({Hello: 'World'}))
})


// PASSPORT
const passport = require('passport')
const cookieParser = require('cookie-parser')
const seesion = require('express-session')
const Strategy = require('passport-local').Strategy
const User = require('./auth/models/user')

app.use(cookieParser())
app.use(seesion({
	secret: 'my super secret',
	resave: true,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, cb) => {
	cb(null, user)
})

passport.deserializeUser((user, cb) => {
	cb(null, user)
})

passport.use(new Strategy({
	userNameField: 'userName',
	passwordField: 'password'
}, (name, pwd, cb) => {
	User.findOne({userName: name}, (err, user) => {
		if (err) {
			console.error('could not find in mongoDB', err)
		}
		if (user.password !== pwd) {
			console.log('wrong password')
			cb(null, false)
		} else {
			console.log(`${name} found in MongoDB and authenticated`)
			cb(null, user)
		}
	})
}))

app.use('/api/v1', playersRouter)
app.use('/api/v1', tournamentsRouter)
app.use((req, res) => {
	const err = new Error('404 - Not found !')
	err.status = 404
	res.json({msg: '404 Not Found !!', err: err})
})

const url ="mongodb+srv://Cedric:DartDB@dart-cluster-ckd4d.gcp.mongodb.net/test?retryWrites=true&w=majority"
const devUri = 'mongodb://localhost:27017/dart-tournament'

mongoose.connect(devUri, {useUnifiedTopology: true, useNewUrlParser: true})
connection.on('error', (err) => {
	console.error(`Connection to mongoDB error : ${err.message}`)
})

connection.once('open', () => {
	console.log(`Connected to mongoDB with uri : ${url}`)
	app.listen(app.get('port'), () => {
		console.log(`express server listening on port ${app.get('port')} !!!`)
	})
})
