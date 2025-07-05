const User = require("../models/user.model")
const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            throw new Error('Token is not valid. Please try to Login once again!')
        }
        const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ _id });
        if (!user) {
            throw new Error('User not found')
        }
        req.user = user
        next()
    } catch (error) {
        res.status(400).send('Error: ' + error.message)
    }
}

module.exports = { userAuth }