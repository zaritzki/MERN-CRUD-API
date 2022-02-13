const asyncHandler = require('express-async-handler')

const goalSchema = require('../models/goalModel')
const userSchema = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
	const goalsData = await goalSchema.find({ user: req.user.id })
	res.status(200).json(goalsData)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400)
		throw new Error('Missing body text')
	}

	const goalData = await goalSchema.create({
		text: req.body.text,
		user: req.user.id,
	})
	res.status(200).json(goalData)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
	const goalData = await goalSchema.findById(req.params.id)

	if (!goalData) {
		res.status(400)
		throw new Error('Goal not found')
	}

	const userData = await userSchema.findById(req.user.id)

	// Check for user
	if (!userData) {
		res.status(401)
		throw new Error('User not found')
	}

	// Making sure only the logged in user matches the goal user
	if (goalData.user.toString() !== userData.id) {
		res.status(401)
		throw new Error('User not found')
	}

	const updatedGoal = await goalSchema.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	)
	res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
	const goalData = await goalSchema.findById(req.params.id)

	if (!goalData) {
		res.status(400)
		throw new Error('Goal not found')
	}

	const userData = await userSchema.findById(req.user.id)

	// Check for user
	if (!userData) {
		res.status(401)
		throw new Error('User not found')
	}

	// Making sure only the logged in user matches the goal user
	if (goalData.user.toString() !== userData.id) {
		res.status(401)
		throw new Error('User not found')
	}

	await goalData.remove()
	res.status(200).json({ id: req.params.id })
})

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
}
