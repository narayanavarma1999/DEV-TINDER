const { mongooseConnection } = require('./config/database.connection')
const User = require('./models/user.model')
const { validateSignUpData, validateLoginUser } = require('../src/utils/validation')
const { encryptUserPassword } = require('../src/utils/password.encryption')
const express = require('express');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { userAuth } = require('./middlewares/user.auth')

/* 
*  creating an express instance for building application using express function
*/
const app = express()

const dotenv = require('dotenv');

dotenv.config()

app.use(express.json())

app.use(cookieParser())

/* 
*   creates an user in the database with 
*   @param req.body
*   where user sends is details
*/

app.post('/signup', async (req, res) => {
    try {
        /*
         * validation of data 
         */

        validateSignUpData(req);

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

app.post('/login', async (req, res) => {
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
 *  profile  api which fetches all the user details
 */

app.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send('Error:' + error.message)
    }
})


/* 
* sends connection request to other users
*/

app.post('/connections/send', userAuth, (req, res) => {
    const { firstName, lastName } = req.user
    console.log(`Connection request`)
    res.send(`${firstName + " " + lastName}  Sent Request`)
})


/* 
*  fetches all the user details with emailId
*/

app.get('/user', async (req, res) => {
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
*  fetches all the user details
*/

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            res.status(404).send('User not found')
        }
        res.status(200).send(users)
    } catch (error) {
        console.log(`Error while fetching user:${error.message}`)
        res.status(400).send(`Failed to fetch users`)
    }
})

/* 
* update user details based on their userId
*/

app.patch('/user/:userId', async (req, res) => {
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

app.delete('/user', async (req, res) => {
    const userId = req.query.userId
    try {
        await User.findByIdAndDelete(userId)
        res.status(200).send('User has been successfully Deleted')
    } catch (error) {
        console.log(`Error while fetching user:${error.message}`)
        res.status(422).send(`Failed to delete user`)
    }
})


app.use('/', (err, req, res, next) => {
    console.log(`something went wrong in final call with error message:${err.message}`)
    res.send("Something went wrong " + err.message)
})


/* 
*   app creates an server with listen function with the 
*   specified port to run the server on port to process the request 
*/

const port = process.env.PORT || 3000

mongooseConnection().then(() => {
    console.log(`Database Connection Established Successfully`)
    app.listen(port, () => {
        console.log(`Server is running on port: ${port} `)
    })
}).catch((error) => {
    console.error(`Error while connecting to Database:${error.message}`)
})