const validator = require('validator');
const User = require('../models/user.model');
const bcrypt = require('bcrypt')

const validateSignUpData = async (req) => {

    const { firstName, lastName, emailId, password } = req.body

    if (!firstName || firstName.trim().length < 4) {
        throw new Error('First name is required and must be at least 4 characters long');
    }

    if (!lastName || lastName.trim().length < 4) {
        throw new Error('Last name is required and must be at least 4 characters long');
    }

    if (!validator.isEmail(emailId)) {
        throw new Error('Please provide a valid user emailId')
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Please Ensure you provide a Strong Password')
    }

    const user = await User.findOne({ emailId })

    if (user) {
        throw new Error('EmailId Already Exists')
    }
}

const validateUser = async (emailId) => {
    const user = await User.findOne({ emailId })
    if (!user) {
        throw new Error(`User with EmailId doesn't exists. Please register and Login!`)
    }
    return user
}

const validateForgotPassword = async (emailId, password) => {
    const user = await validateUser(emailId)
    if (!validator.isStrongPassword(password)) {
        throw new Error('Please Ensure you provide a Strong Password')
    }
    return user
}

const validateLoginUser = async (emailId, password) => {
    const user = await validateUser(emailId)
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        throw new Error('Invalid Credentials')
    }
    return { user, isValidPassword }
}

const validateEditProfileData = async (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"]
    let isUpdatePayloadValid = Object.keys(req.body).every(key => allowedEditFields.includes(key))
    return isUpdatePayloadValid
}

module.exports = { validateSignUpData, validateUser, validateLoginUser, validateEditProfileData, validateForgotPassword }