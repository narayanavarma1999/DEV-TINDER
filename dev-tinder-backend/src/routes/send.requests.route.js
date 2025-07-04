const express = require('express')
const { userAuth } = require('../middlewares/user.auth')
const sendRequestRouter = express.Router()

/* 
* sends connection request to other users
*/

sendRequestRouter.post('/interested/:userId', userAuth, (req, res) => {
    const { firstName, lastName } = req.user
    console.log(`Connection request`)
    res.send(`${firstName + " " + lastName}  Sent Request`)
}
)

module.exports = sendRequestRouter