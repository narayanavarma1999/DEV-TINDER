const express = require('express')
const { userAuth } = require('../middlewares/user.auth')
const { encryptUserPassword } = require('../utils/password.encryption')
const { validateEditProfileData, validateForgotPassword, validateUser } = require('../utils/validation')
const User = require('../models/user.model')


const profileRouter = express.Router()

/*
 *  profile  api which fetches all the user details
 */

profileRouter.get('/view', userAuth, async (req, res) => {
    try {
        const user = req.user
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send('Error:' + error.message)
    }
})


/* 
* Edit (or) update user profile details 
*/
profileRouter.patch('/edit', userAuth, async (req, res) => {
    try {
        if (!(await validateEditProfileData(req))) {
            throw new Error('Invalid Edit Request')
        }
        const loggedInUser = req.user

        Object.keys(req.body).forEach(key => {
            loggedInUser[key] = req.body[key]
        })

        await loggedInUser.save()

        res.status(200).json({ message: `${loggedInUser.firstName}, Your Profile has been Updated Successfully`, data: loggedInUser })
    } catch (error) {
        res.status(400).send('Error: ' + error.message)
    }
})

/* 
*  updates password when user forgots the password
*/

profileRouter.patch('/forgot/password', async (req, res) => {
    try {
        const emailId = req.body.emailId

        const password = req.body.password

        const user = await validateForgotPassword(emailId, password)

        /*
         * encrypt the password  
         */
        const passwordHash = await encryptUserPassword(password)

        await User.findByIdAndUpdate({ _id: user._id }, { password: passwordHash })

        res.status(200).send('New Password Updated Successfully')
    } catch (error) {
        res.status(400).send('Error: ' + error.message)
    }
})

module.exports = profileRouter