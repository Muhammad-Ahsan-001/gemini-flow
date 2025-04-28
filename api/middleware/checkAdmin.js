const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminModel = require('../models/admins')
const check = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).send("No token found")
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            res.status(401).send('Admin token not found')
            console.log(req.cookies)
            return
        }
        const result = jwt.decode(token)
        const data = await adminModel.findById(result._id)
        if (!data) {
            res.status(401).send('No data found in admin')
            return
        }
        req.body.adminData = { _id: result._id }
        const { password } = data
        const match = await bcrypt.compare(result.password, password)
        if (!match) {
            res.status(401).send("Password incorrect in admin middleware")
            return
        }
        next()
    } catch (err) {
        res.status(500).send("Something goes wrong in the server")
        console.log(err)
    }
}
module.exports = check