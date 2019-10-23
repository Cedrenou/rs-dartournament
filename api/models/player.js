const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
	firstname: String,
	lastName: String,
	points: Number,
})


module.exports = mongoose.model('Player', playerSchema)