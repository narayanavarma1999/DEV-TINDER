const { mongooseConnection } = require('./config/database.connection')
const User = require('./models/user.model')
const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const profileRouter = require('./routes/profile.route')
const revirewRequestRouter = require('./routes/review.requests.route')
const sendRequestRouter = require('./routes/send.requests.route')
const userRouter = require('./routes/user.routes')
const cors = require('cors')

/* 
*  creating an express instance for building application using express function
*/
const app = express()

const dotenv = require('dotenv');

dotenv.config()

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use('/auth', authRouter)

app.use('/user', userRouter)

app.use('/profile', profileRouter)

app.use('/request/send', sendRequestRouter)

app.use('/request/review', revirewRequestRouter)


/* 
*  fetches all the user details
*/

app.get('/feed', async (_req, res) => {
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


app.use('/', (err, _req, res, _next) => {
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