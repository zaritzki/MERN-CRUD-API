const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const userSchema = require('../models/userModel')

const protected = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Get token from header - and split by space (Beader $token)
			token = req.headers.authorization.split(' ')[1]

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			// Get user from the token
			// Assign it to request.user so that we can access req.user to any routes that protected
			// Minus/Remove password, so it wont include the hahsed password
			req.user = await userSchema.findById(decoded.id).select('-password')

			// Calling the next piece of middleware
			next()
		} catch (err) {
			console.log(err)
			res.status(401)
			throw new Error('Not authorized')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

module.exports = { protected }
