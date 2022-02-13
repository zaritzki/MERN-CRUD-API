const express = require('express')
const router = express.Router()
const {
	registerUser,
	loginUser,
	getMyDetails,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMyDetails)

module.exports = router
