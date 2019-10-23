const mongoose = require('mongoose')
const PlayerSchema = require('./player')

const tournamentSchema = new mongoose.Schema({
	name: String,
	players: {type: mongoose.Schema.Types.Array, ref: PlayerSchema}
})


module.exports = mongoose.model('Tournament', tournamentSchema)
