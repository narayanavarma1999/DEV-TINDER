const mongoose = require("mongoose")
const dotenv = require('dotenv')

dotenv.config()

const url = process.env.MONGODB_URI

async function mongooseConnection() {

    return await mongoose.connect(url)

}

module.exports = { mongooseConnection }