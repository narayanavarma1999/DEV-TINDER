const express = require('express');
const User = require('../models/user.model');
const { userAuth } = require('../middlewares/user.auth');
const ConnectionRequest = require('../models/connection.request.model');
const STATUS = require('../utils/connection.status.constants');
const userRouter = express.Router()

/* 
* feed api
*/


userRouter.get('/feed', userAuth, async (req, res) => {
    try {
        // user can see all cards except 
        /*  
            his own card,
            his connections,
            and people who he has accepted and rejected
            aleady send request connections
        */

        const hideConnectionsId = new Set()
        const loggedInUserId = req.user._id

        /* 
        *  adding pagination if received from request
        *  or use default values
        */
        let limit = parseInt(req.query.limit) || 10
        limit = (limit > 50) ? 50 : limit
        const page = parseInt(req.query.page) || 1
        const skip = (page - 1) * 10

        /* 
         Initially hiding own loginUserId from the feed  
        */
        hideConnectionsId.add(loggedInUserId)

        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUserId }, { fromUserId: loggedInUserId }
            ]
        }).select(CONNECTION_USER_FIELDS)

        connections.forEach(connection => {
            hideConnectionsId.add(connection.toUserId)
            hideConnectionsId.add(connection.fromUserId)
        })

        const data = await User.find({ _id: { $nin: Array.from(hideConnectionsId) } }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        res.status(200).json({ data })

    } catch (error) {
        res.status(400).send('ERROR:' + error.message)
    }
})


/* 
*  Gets all the pending connection requests for the loggedIn user 
*/

userRouter.get('/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const data = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: STATUS.INTERESTED
        }).populate('fromUserId', ["firstName", "lastName", "photoUrl"])

        res.status(200).json({ message: `All ${loggedInUser.firstName} Connections are retrieved`, data })
    } catch (error) {
        res.status(400).send(`ERROR: ` + error.message)
    }
})


/* 
*  Retrieves all the accepted connections associated to the user
*/

userRouter.get('/connections', userAuth, async (req, res) => {
    const userId = req.user._id
    try {
        const connections = await ConnectionRequest.find({
            $or: [{
                toUserId: userId, status: STATUS.ACCEPTED
            }, {
                fromUserId: userId, status: STATUS.ACCEPTED
            }]
        },
        )
            .populate('fromUserId', ["firstName", "lastName", "photoUrl"])
            .populate('toUserId', ["firstName", "lastName", "photoUrl"])

        const data = connections.map(connection => {
            if ((connection.fromUserId.toString() === userId.toString()) || (connection.toUserId.toString() === userId.toString())) {
                return connection
            }
        })
        res.status(200).json({ data })

    } catch (error) {
        res.status(500).send('Error:' + error.message)
    }
})


/* 
*  fetches all the user details with emailId
*/

userRouter.get('/user', async (req, res) => {
    try {
        const emailId = req.body.emailId;
        const user = await User.find({ emailId });
        if (!user) {
            res.status(404).send('User not found')
        }
        res.status(200).send(user)
    } catch (error) {
        console.log(`Error while fetching user:${error.message}`)
        res.status(400).send(`Failed to fetch user`)
    }
})


/* 
* update user details based on their userId
*/

userRouter.patch('/user/:userId', async (req, res) => {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"]
    const data = req.body
    const isUpdatesAllowed = Object.keys(data).every(key => {
        ALLOWED_UPDATES.includes(key)
    })
    try {
        if (!isUpdatesAllowed) {
            res.status(400).send(`Updates not Allowed`)
        }
        const userId = req.params.userId
        const user = await User.findByIdAndUpdate(userId, data, { runValidators: true })
        res.status(204).send('User has been updated successfully')
    } catch (error) {
        console.log(`Error while updating user:${error.message}`)
        res.status(400).send(`Failed to update user`)
    }
})

/* 
*  delete an user based on userId
*/

userRouter.delete('/user', async (req, res) => {
    const userId = req.query.userId
    try {
        await User.findByIdAndDelete(userId)
        res.status(200).send('User has been successfully Deleted')
    } catch (error) {
        console.log(`Error while fetching user:${error.message}`)
        res.status(422).send(`Failed to delete user`)
    }
})

module.exports = userRouter