const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	points: Number,
})


module.exports = mongoose.model('Player', playerSchema)
