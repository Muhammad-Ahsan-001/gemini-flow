const router = require("express").Router()
const { test, home, createUser, fetchUsers, modifyUser, deleteUser, modifyAdmin } = require('../controllers/app')
const middleware = require('../middleware/checkAdmin')
const checkUser = require('../middleware/checkUser')

router.get('/', test)
router.get('/home', checkUser, home)
router.get('/users', middleware, fetchUsers)
router.post('/user/add', createUser)
router.put('/user/modify', middleware, modifyUser)
router.put('/admin/modify', middleware, modifyAdmin)
router.delete('/user/delete/:_id', deleteUser)

module.exports = router