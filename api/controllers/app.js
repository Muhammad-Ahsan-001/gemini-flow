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


const test = async (req, res) => {
    res.send('working')
}

module.exports = { home, createUser, userLogin, test }