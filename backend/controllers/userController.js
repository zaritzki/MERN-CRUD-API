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
	const userData = await userSchema.create({
		email,
		password: hashedPassword,
		name,
		userType,
	})

	// Double check if the user is created
	if (userData) {
		res.status(201).json({
			_id: userData.id,
			email: userData.email,
			name: userData.name,
			userType: userData.userType,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// Check for user email
	const userData = await userSchema.findOne({ email })

	// Check for user password
	if (userData && (await bcrypt.compare(password, userData.password))) {
		res.json({
			_id: userData.id,
			email: userData.email,
			name: userData.name,
			userType: userData.userType,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user credentials')
	}
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
