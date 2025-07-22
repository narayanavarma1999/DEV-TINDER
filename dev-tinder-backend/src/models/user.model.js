const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require("../utils/constants")

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },


    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },

    lastName: {
        type: String,
        trim: true,
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
        enum: {
            values: ['male', 'female', 'others'],
            message: '{VALUE}  specified has incorrect gender type'
        },
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

    location: {
        type: String
    },

    interests: {
        type: [String]
    },

    images: {
        type: [String]
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






userSchema.methods.getJWT = async function () {
    const secretKey = process.env.JWT_SECRET_KEY || JWT_SECRET_KEY
    const token = jwt.sign({ _id: this._id }, secretKey, { expiresIn: '1d' })
    return token
}


const User = mongoose.model('User', userSchema)

module.exports = User