const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 50
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 50
    },

    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        index: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address " + value)
            }
        }
    },

    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(`Enter a Strong Password` + value)
            }
        }
    },

    age: {
        type: Number,
        min: 18,
        max: 100
    },

    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value.toLowerCase())) {
                throw new Error('Gender data is not valid')
            }
        }
    },

    photoUrl: {
        type: String,
        default: "https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg",
        validator(value) {
            if (!validator.isURL(value)) {
                throw new Error('Invalid Photo URL ' + value)
            }
        }
    },

    about: {
        type: String
    },

    skills: {
        type: [String]
    }
},
    {
        timestamps: true,

        versionKey: false,

        strict: 'throw',
    })

const User = mongoose.model('User', userSchema)

module.exports = User