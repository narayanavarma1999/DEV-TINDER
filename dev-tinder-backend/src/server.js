import express from 'express';

/* 
*  creating an express instance for building application using express function
*/
const app = express()


app.use('/test', (req, res) => {
    res.send("Hello World")
})


/* 
*   app creates an server with listen function with the 
*   specified port to run the server on port to process the request 
*/

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port: ${port} `)
})