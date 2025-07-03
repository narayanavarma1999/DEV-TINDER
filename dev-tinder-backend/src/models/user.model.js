const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        index: true,
    },

    password: {
        type: String
    },

    age: {
        type: Number
    },

    gender: {
        type: String
    },
}, 
    {
    timestamps: true,

    versionKey: false,

    strict: 'throw',
})

const User = mongoose.model('User', userSchema)

module.exports = User