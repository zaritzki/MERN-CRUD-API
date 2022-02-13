const express = require('express')
const router = express.Router()
const {
	registerUser,
	loginUser,
	getMyDetails,
} = require('../controllers/userController')

const { protected } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protected, getMyDetails)

module.exports = router
