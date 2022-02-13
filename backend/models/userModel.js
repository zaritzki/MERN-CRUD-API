const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'Please add your email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add your password'],
		},
		name: {
			type: String,
			required: [true, 'Please add your name'],
		},
		userType: {
			type: Number,
			required: [true, 'Please select your userType'],
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', userSchema)
