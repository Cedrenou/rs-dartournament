const mongoose = require('mongoose')
mongoose.set('bufferCommands', false)


const userSchema = new mongoose.Schema({
	userName: {type: String, required: true},
	password: {type: String, required: true},
	createdOn: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('User', userSchema)
