const express = require('express')
const { validateSignUpData, validateLoginUser } = require('../utils/validation')
const { encryptUserPassword } = require('../utils/password.encryption')
const User = require('../models/user.model')

const authRouter = express.Router()

/* 
*   creates an user in the database with 
*   @param req.body
*   where user sends is details
*/

authRouter.post('/signup', async (req, res) => {
    try {
        /*
         * validation of data 
         */

        await validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body

        /*
         * encrypt the password  
         */
        const passwordHash = await encryptUserPassword(password)

        const userData = new User({ firstName, lastName, emailId, password: passwordHash });

        await User.create(userData)
        res.status(201).send(`User Created Successfully`)
    } catch (error) {
        console.log(`Error while creating  user:${error.message}`)
        res.status(400).send(`Failed to create user with Error: ${error.message}`)
    }
}
)

/* 
*  login's the uses
*/

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body
        const { user, isValidPassword } = await validateLoginUser(emailId, password);
        if (!isValidPassword) {
            throw new Error('Invalid Credentials')
        }

        /*
         *  create a JWT token  
         */
        const token = await user.getJWT()

        res.cookie("token", token, { expires: new Date(Date.now() + 8 * 360000) })
        res.status(200).send('Login Successfully')
    } catch (error) {
        console.error(`Error while login user:${error.message}`)
        res.status(400).send(error.message)
    }
})

/* 
 * logout the user from the platform
 */

authRouter.post('/logout', async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: 'Logged out successfully' })

})

module.exports = authRouter 