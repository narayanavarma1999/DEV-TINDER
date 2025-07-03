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

app.use('/api', (req, res, next) => {
    console.log('Runs for all methods starting with /api');
    //next();
    res.send(`Hello world`)
});


app.get('/test', (req, res, next) => {
    try {
        throw new Error(`error in Test`)
    } catch (error) {
        console.log(`error in test:${error.message}`)
    }
})


app.post('/signup', (req, res) => {
    console.log(`in post call ${JSON.stringify(req.body)}`)
    const { firstName, lastName, emailId, password, age, gender } = req.body
    const userData = { firstName, lastName, emailId, password, age, gender }
    User.create(userData)
}
)


app.use('/', (err, req, res, next) => {
    console.log(`something went wrong in final call with error message:${err.message}`)
    res.send("Something went wrong " + err.message)
})


app.all('/admin', (req, res) => {
    console.log('in admin ')
    res.send(`Handled ${req.method} request to /admin`);
});


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
