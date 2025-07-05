const express = require('express')
const { userAuth } = require('../middlewares/user.auth')
const ConnectionRequest = require('../models/connection.request.model')
const User = require('../models/user.model')
const { STATUS } = require('../utils/connection.status.constants')
const sendRequestRouter = express.Router()

/* 
* sends connection request to other users
*/

sendRequestRouter.post('/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const { firstName, lastName, _id } = req.user

        const fromUserId = _id
        const toUserId = req.params.toUserId
        const status = req.params.status

        /* 
        *  verify whether a valid status has been received from the request
        */
        const allowedStatus = [STATUS.INTERESTED, STATUS.IGNORED]

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type:" + status })
        }

        /* 
        *  verify whether the to user exists in order to send the request
        */

        const toUser = await User.findOne({ _id: toUserId });

        if (!toUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        /* 
        *   Verifying whether there is an already existing connection request
        */

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {
                    fromUserId,
                    toUserId
                },
                {
                    fromUserId: toUserId,
                    toUserId: fromUserId
                }
            ]
        })

        if (existingConnectionRequest) {
            return res.status(400).json({ message: 'Already Connection Request Exists' })
        }

        const connection = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connection.save();

        const message = status === STATUS.INTERESTED ? `${firstName}, Your connection request has been sent successfully to ${toUser.firstName}` : `Unfortunately, ${firstName} has decided not to pursue connection with ${toUser.firstName}`

        res.status(200).json({ message, data })


    } catch (error) {
        res.status(400).send('Error:' + error.message)
    }
}
)

module.exports = sendRequestRouter