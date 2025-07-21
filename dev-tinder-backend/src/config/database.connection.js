const mongoose = require("mongoose")
const dotenv = require('dotenv')
const { DATABASE_URI } = require('../utils/constants')


dotenv.config()

const url = process.env.MONGODB_URI || DATABASE_URI

async function mongooseConnection() {

    return await mongoose.connect(url)

}

module.exports = { mongooseConnection }