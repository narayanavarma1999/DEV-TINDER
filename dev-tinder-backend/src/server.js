const { mongooseConnection } = require('./config/database.connection')
const User = require('./models/user.model')
const express = require('express');

/* 
*  creating an express instance for building application using express function
*/
const app = express()

const dotenv = require('dotenv')

dotenv.config()

app.use(express.json())

/* 
*   creates an user in the database with 
*   @param req.body
*   where user sends is details
*/

app.post('/signup', async (req, res) => {
    try {
        console.log(`in post call ${JSON.stringify(req.body)}`)
        const userData = new User(req.body);
        await User.create(userData)
        res.status(201).send(`User Created Successfully`)
    } catch (error) {
        console.log(`Error while creating  user:${error.message}`)
        res.status(422).send(`Failed to create user`)
    }
}
)

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