const router = require('express').Router()
const { userLogin } = require('../controllers/app')

router.post('/user', userLogin)

module.exports = router