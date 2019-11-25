const express = require('express')
const router = express.Router()
const Player = require('../models/player')

/* GET All players */
router.get('/players', (req, res) => {
	Player.find()
		.sort({'id': 1})
		.exec()
		.then(players => res.status(200).json(players))
		.catch(err => res.status(500).json({
				message: 'players not found :(',
				error: err
			})
		)
})

/* GET player by id */
router.get('/player/:id', (req, res) => {
	const id = req.params.id
	Player.findById(id)
		.then(player => res.status(200).json(player))
		.catch(err => res.status(500).json({message: `player with id ${id} not found !`, error: err}))
})

/**
 * POST
 **/

/* RaZ */
router.post('/player/raz', (req, res) => {
	const id = req.body._id

	const filter = {_id: id}
	const update = {
		points: 0,
		nbGamesPlayed: 0,
		nbFirstPlace: 0,
		nbSecondPlace: 0,
		nbThirdPlace: 0
	}

	Player.findOneAndUpdate(filter, update, (err) => {
		if (err) {
			return res.status(500).json(err)
		}
		res.status(202).json({msg: `Reset points to 0`})
	})
})

/* FIRST */
router.post('/player/first-place', (req, res) => {
	const id = req.body._id
	const pts = req.body.points
	const nbFirstPlace = req.body.nbFirstPlace
	const nbGamesPlayed = req.body.nbGamesPlayed

	const filter = {_id: id}
	const update = {
		points: pts + 5,
		nbFirstPlace: nbFirstPlace + 1,
		nbGamesPlayed: nbGamesPlayed + 1
	}

	Player.findOneAndUpdate(filter, update, (err) => {
		if (err) {
			return res.status(500).json(err)
		}
		res.status(202).json({msg: `UPDATED points`})
	})
})

/* SECOND */
router.post('/player/second-place', (req, res) => {
	const id = req.body._id
	const pts = req.body.points
	const nbSecondPlace = req.body.nbSecondPlace
	const nbGamesPlayed = req.body.nbGamesPlayed

	const filter = {_id: id}
	const update = {
		points: pts + 3,
		nbSecondPlace: nbSecondPlace + 1,
		nbGamesPlayed: nbGamesPlayed + 1
	}

	Player.findOneAndUpdate(filter, update, (err) => {
		if (err) {
			return res.status(500).json(err)
		}
		res.status(202).json({msg: `UPDATED points`})
	})
})

/* THIRD */
router.post('/player/third-place', (req, res) => {
	const id = req.body._id
	const pts = req.body.points
	const nbThirdPlace = req.body.nbThirdPlace
	const nbGamesPlayed = req.body.nbGamesPlayed

	const filter = {_id: id}
	const update = {
		points: pts + 1,
		nbThirdPlace: nbThirdPlace + 1,
		nbGamesPlayed: nbGamesPlayed + 1
	}

	Player.findOneAndUpdate(filter, update, (err) => {
		if (err) {
			return res.status(500).json(err)
		}
		res.status(202).json({msg: `UPDATED points}`})
	})
})

/* POST Add New Player */
router.post('/player', (req, res) => {
	console.log('req.body', req.body)
	const player = new Player(req.body)
	player.save((err, player) => {
		if (err) {
			return res.status(500).json(err)
		}
		res.status(201).json(player)
	})
})

/* DELETE */
router.delete('/player/:id', (req, res) => {
	const id = req.params.id
	Player.findByIdAndDelete(id, (err, player) => {
		if (err) {
			return res.status(500).json(err)
		}
		res.status(202).json({msg: `player with id ${player._id}  deleted`})
	})
})


module.exports = router
