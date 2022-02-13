const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const userSchema = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, userType } = req.body

	// Validate user data
	if (!email || !password || !name || !userType) {
		res.status(400)
		throw new Error('Please add all required fields')
	}

	// Check if user exists
	const userExists = await userSchema.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error({ message: 'Email already exists' })
	}

	// Hash use password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	// Create user
	const user = await userSchema.create({
		email,
		password: hashedPassword,
		name,
		userType,
	})

	// Double check if the user is created
	if (user) {
		res.status(201).json({
			_id: user.id,
			email: user.email,
			name: user.name,
			userType: user.userType,
		})
	} else {
		res.status(400)
		throw new Error({ message: 'Invalid user data' })
	}
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	res.json({ message: 'Login User' })
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Public
const getMyDetails = asyncHandler(async (req, res) => {
	res.json({ message: 'My details' })
})

module.exports = {
	registerUser,
	loginUser,
	getMyDetails,
}
