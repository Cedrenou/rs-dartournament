const express = require('express')
const router = express.Router()

const Tournament = require('../models/tournament')


router.get('/tournaments', (req, res) => {
	const tournaments = [
		{
			id: 1,
			name: 'Tournoi n°1',
		},
		{
			id: 2,
			name: 'Tournoi n°2',
		},
		{
			id: 3,
			name: 'Tournoi n°3',
		},
	]
	res.status(200).json(tournaments)
})

router.post('/tournament', (req, res) => {
	console.log('tournament body : ', req.body)
	const tournament = new Tournament(req.body)
	tournament.save((err, tournament) => {
		if (err) {
			return res.status(500).json(err)
		}
		res.status(201).json(tournament)
	})
})


module.exports = router
