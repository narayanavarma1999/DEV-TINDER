const express = require('express')
const userRouter = express.Router()


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