const bcrypt = require('bcrypt')
const adminModel = require('../models/admins')
const userModel = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const home = async (req, res) => {
    try {
        res.json('Authorized')
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}

const createAdmin = async (req, res) => {
    try {
        const { emailValue: email, passwordValue: password } = req.body
        const hashedPwd = bcrypt.hashSync(password, 8)
        await adminModel.create({ email, password: hashedPwd })
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body

        if (!email || !password || !name) return res.status(400).json("Data missing!")

        const prevUser = await userModel.exists({ email })

        if (prevUser) return res.status(400).json({ err: "User already exists!" })

        const hashedPwd = bcrypt.hashSync(password, 8)
        await userModel.create({ email, password: hashedPwd, name })

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) {
            res.status('401').json({ err: "body not found while logging in the user" })
        }

        const data = await userModel.findOne({ email })
        if (!data) {
            res.status(401).json({ err: "No data found while logging in the user" })
            return
        }

        const { password: dataPassword } = data

        const truePwd = await bcrypt.compare(password, dataPassword)
        if (!truePwd) {
            res.status(401).json({ err: "Password didn't match for user" })
            return
        }

        const token = jwt.sign({ email, password: dataPassword, _id: data._id }, process.env.SECRET)

        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json("Something goes wrong while logging in the user")
    }
}

const adminLogin = async (req, res) => {
    try {
        const { emailValue: email, passwordValue: password } = req.body
        if (!email) {
            res.status(401).json("No email found while logging in the admin")
        }
        const data = await adminModel.findOne({ email })
        if (!data) {
            res.status(401).json("No data found while logging in the admin")
            return
        }
        const truePwd = await bcrypt.compare(password, data.password)
        if (!truePwd) {
            res.status(401).json("Password didn't match while logging in the admin")
            return
        }
        const token = jwt.sign({ email, password, _id: data._id }, process.env.SECRET)
        res.json({ token })

    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong in the server while logging in the admin")
    }
}

const fetchUsers = async (req, res) => {
    try {
        const data = await userModel.find().select('_id email assistant_id devicesAllowed apiKey visitorIds')
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong while fetching users")
    }
}

const modifyUser = async (req, res) => {
    try {
        const { email, assistant_id, _id, password, apiKey } = req.body
        if (!(email || assistant_id || _id || apiKey)) {
            res.status(400).json("Information is missing")
        }
        if (password) {
            const hashedPwd = bcrypt.hashSync(password, 8)
            await userModel.findByIdAndUpdate(_id, { email, password: hashedPwd, assistant_id, apiKey })
            res.sendStatus(202)
            return
        }
        await userModel.findOneAndUpdate({ _id }, { assistant_id, email, apiKey })
        res.sendStatus(202)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
const modifyAdmin = async (req, res) => {
    try {
        const { password, adminData } = req.body
        const { _id } = adminData
        if (!(_id || password)) {
            res.status(400).json("Information is missing")
        }
        const hashedPwd = bcrypt.hashSync(password, 8)
        await adminModel.findByIdAndUpdate(_id, { password: hashedPwd })
        res.sendStatus(202)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { _id } = req.params
        if (!_id) {
            res.status(400).json("Id not found")
            return
        }
        const data = await userModel.findByIdAndDelete(_id)
        if (!data) {
            res.status(400).json("User not found")
            return
        }
        res.sendStatus(202)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const test = async (req, res) => {
    res.send('working')
}

module.exports = { modifyAdmin, test, home, userLogin, adminLogin, createUser, createAdmin, fetchUsers, modifyUser, deleteUser }