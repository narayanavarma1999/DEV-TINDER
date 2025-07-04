const express = require('express')
const { userAuth } = require('../middlewares/user.auth')


const profileRouter = express.Router()

/*
 *  profile  api which fetches all the user details
 */

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send('Error:' + error.message)
    }
})


module.exports = profileRouter