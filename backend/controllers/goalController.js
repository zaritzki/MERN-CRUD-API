const asyncHandler = require('express-async-handler')

const goalSchema = require('../models/goalModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await goalSchema.find()
	res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400)
		throw new Error('Missing body text')
	}

	const goal = await goalSchema.create({
		text: req.body.text,
	})
	res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await goalSchema.findById(req.params.id)

	if (!goal) {
		res.status(400)
		throw new Error('Goal not found')
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
	const goal = await goalSchema.findById(req.params.id)

	if (!goal) {
		res.status(400)
		throw new Error('Goal not found')
	}

	await goal.remove()
	res.status(200).json({ id: req.params.id })
})

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
}
