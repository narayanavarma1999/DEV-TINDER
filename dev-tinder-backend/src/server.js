const { mongooseConnection } = require('./config/database.connection')
const { REMOTE_FRONT_WEB_IP, LOCAL_WEB_APP } = require('./utils/constants');
const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const profileRouter = require('./routes/profile.route')
const imageUploadRouter = require('./routes/image.upload.route')
const revirewRequestRouter = require('./routes/review.requests.route')
const sendRequestRouter = require('./routes/send.requests.route')
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const paymentRouter = require('./routes/payment');
const { initializeSocket } = require('./utils/socket');

/* 
*  creating an express instance for building application using express function
*/
const app = express()

const path = process.env.NODE_ENV === "production" ? `.env.${process.env.NODE_ENV}` : `.env`

console.log(`environment path:${path}`)

dotenv.config({
    path
});

const allowedOrigins = [
    LOCAL_WEB_APP,
    REMOTE_FRONT_WEB_IP
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};


app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/auth', authRouter)

app.use('/user', userRouter)

app.use('/profile', profileRouter)

app.use('/request/send', sendRequestRouter)

app.use('/request/review', revirewRequestRouter)

app.use('/upload', imageUploadRouter)

app.use('/payment', paymentRouter)


app.use('/', (err, _req, res, _next) => {
    console.log(`something went wrong in final call with error message:${err.message}`)
    res.send("Something went wrong " + err.message)
})

const server = http.createServer(app);


/* 
*   app creates an server with listen function with the 
*   specified port to run the server on port to process the request 
*/

initializeSocket(server)

const port = process.env.PORT || 3000

mongooseConnection().then(() => {
    console.log(`Database Connection Established Successfully`)
    server.listen(port, () => {
        console.log(`Server is running on port: ${port} `)
    })
}).catch((error) => {
    console.error(`Error while connecting to Database:${error.message}`)
})

