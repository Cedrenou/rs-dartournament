const express = require('express')
const router = express.Router()
const Player = require('../models/player')

/* GET All players */
router.get('/players', (req, res) => {
	console.log('req.user', req.user)
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

/* POST */
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
