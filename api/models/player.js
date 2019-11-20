const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	points: Number,
	nbGamesPlayed: Number,
	nbFirstPlace: Number,
	nbSecondPlace: Number,
	nbThirdPlace: Number
})


module.exports = mongoose.model('Player', playerSchema)
