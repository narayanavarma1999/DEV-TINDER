const Razorpay = require("razorpay")

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "1233",
    key_secret: process.env.RAZORPAY_SECRET_KEY || "1233"
})

module.exports = instance