const router = require("express").Router()
const { test, home, createUser } = require('../controllers/app')
const checkUser = require('../middleware/checkUser')

router.get('/', test)
router.get('/home', checkUser, home)
router.post('/user/add', createUser)

module.exports = router