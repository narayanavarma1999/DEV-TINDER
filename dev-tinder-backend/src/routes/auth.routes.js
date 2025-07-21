const express = require('express')
const { validateSignUpData, validateLoginUser } = require('../utils/validation')
const { encryptUserPassword } = require('../utils/password.encryption')
const User = require('../models/user.model')
const { EMAIL_EXISTS } = require('../utils/constants')

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

        const { fullName, firstName, lastName, emailId, password } = req.body

        /*
         * encrypt the password  
         */
        const passwordHash = await encryptUserPassword(password)

        const userData = new User({ fullName, firstName, lastName, emailId, password: passwordHash });

        const user = await userData.save(userData)

        /*
       *  create a JWT token  
       */
        const token = await user.getJWT()

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 360000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        })

        res.status(201).send(user)
    } catch (error) {
        console.log(`Error while creating  user:${error.message}`)
        if (error.message.includes(EMAIL_EXISTS)) {
            return res.send(`${error.message}`)
        }
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

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 360000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // if using HTTPS
            sameSite: 'strict', // or 'lax' depending on your needs
            path: '/'
        })
        res.status(200).send(user)
    } catch (error) {
        console.error(`Error while login user:${error.message}`)
        res.status(400).send(error.message)
    }
})

/* 
 * logout the user from the platform
 */

authRouter.get('/logout', async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    })
    res.cookie('token', '', { expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' })
})

module.exports = authRouter 