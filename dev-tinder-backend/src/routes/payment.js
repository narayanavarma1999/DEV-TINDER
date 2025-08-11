const express = require("express")
const { userAuth } = require("../middlewares/user.auth")
const paymentRouter = express.Router()
const razorpayInstance = require("../utils/razopay")
const Payment = require("../models/payment.model")

paymentRouter.post('/create', userAuth, async (req, res) => {

    try {

        /* create an order to razorpay */
        const order = await razorpayInstance.orders.create({
            "amount": "",
            "currency": "INR",
            "receipt": "receipt#1",
            "partial_payment": false,
            "notes": {
                "firstname": "value1",
                "lastname": "value2",
                "membershiptype": "silver"
            }
        })

        /* save it to our database */

        /* return back my order details to frontend */
        const payment = new Payment({
            userId: req.user._id,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            status: order.status,
            receipt: order.receipt,
            notes: order.notes
        })

        await payment.save()

        res.json({ order, payment })

    } catch (error) {
        console.error(`error while processing payment:${error.message}`)
        return res.status(500).json({ msg: error.message })
    }
})

paymentRouter.post('webhook', async (req, res) => { })

module.exports = paymentRouter