const router = require('express').Router()
const { userLogin, adminLogin, createAdmin } = require('../controllers/app')
router.post('/user', userLogin)
router.post('/admin', adminLogin)
router.post('/super', createAdmin)
module.exports = router