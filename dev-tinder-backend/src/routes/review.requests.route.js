
const express = require('express')
const { userAuth } = require('../middlewares/user.auth')
const STATUS = require('../utils/connection.status.constants')
const ConnectionRequest = require('../models/connection.request.model')
const User = require('../models/user.model')
const mongoose = require("mongoose")
const revirewRequestRouter = express.Router()

revirewRequestRouter.post('/:status/:requestId', userAuth, async (req, res) => {
    try {

        const { status, requestId } = req.params

        const toUserId = req.user._id

        const allowedStatus = [STATUS.ACCEPTED, STATUS.REJECTED]

        /* 
        * validate user status
        */

        if (!allowedStatus.includes(status)) {
            return res.status(400).send('Invalid Status Found')
        }

        /* Validate ObjectId */
        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ message: 'Invalid requestId' });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            toUserId,
            status: STATUS.INTERESTED,
            _id: requestId
        })

        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection Request Not Found" })
        }

        connectionRequest.status = status

        const data = await connectionRequest.save()

        const fromUser = await User.findById(data.fromUserId)

        const message = status === STATUS.ACCEPTED ? `You have accepted ${fromUser.firstName} Connection Request` : `${fromUser.firstName} Connection request has been declined`

        res.status(200).json({ message, data })

    } catch (error) {
        res.status(400).send('Error ' + error.message)
    }
})

module.exports = revirewRequestRouter