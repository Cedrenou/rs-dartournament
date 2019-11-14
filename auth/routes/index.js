const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')


router.post('/register', (req, res) => {
	console.log('User from req.body', req.body)
	const newUser = new User(req.body)
	newUser.save((err, user) => {
		if (err) {
			return res.status(500).json(err)
		}
		req.logIn(req.body, (err) => {
			if (err) {
				console.error('erreur in register | req.login()', err)
			}
		})
		res.status(201).json(user)
	})
})


router.post('/login', passport.authenticate('local', {
	successRedirect: '/auth/success',
	failureRedirect: '/auth/failure'
}))

router.get('/success', (req, res) => {
	res.status(200).json({msg: 'logged in', user: req.user})
})

router.get('/failure', (req, res) => {
	res.status(401).json({msg: 'NOT logged in'})
})

module.exports = router
