const jwt = require('jsonwebtoken')
const userModel = require('../models/users')
const check = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ err: "No token found" })
        }

        // Extracting token from the header
        const token = authHeader.split(' ')[1]
        if (!token) {
            res.status(401).json({ err: "No token found" })
            return
        }

        // Verifying the token
        const result = jwt.verify(token, process.env.SECRET)

        //finding user in the database
        const data = await userModel.findById(result._id)
        if (!data) {
            res.status(401).json({ err: "No data found in user middleware" })
            return
        }

        //checking password
        const { password } = data
        const match = result.password === password
        if (!match) {
            res.status(401).json({ err: "Password didn't match in the middleware of user" })
            return
        }

        req.middlewareData = { _id: result._id }

        next()
    } catch (err) {
        res.status(500).send("Something went wrong in the server middleware")
        console.log(err)
    }
}
module.exports = check