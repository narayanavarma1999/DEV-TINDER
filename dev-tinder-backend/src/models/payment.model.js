const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit_card', 'paypal', 'bank_transfer', 'crypto'],
        default: 'credit_card'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    receiptUrl: {
        type: String,
        default: ''
    },
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    refundId: {
        type: String,
        default: ''
    },
    refundStatus: {
        type: String,
        enum: ['not_requested', 'requested', 'processing', 'completed', 'failed'],
        default: 'not_requested'
    }
}, { timestamps: true })


const ConnectionRequest = mongoose.model("Payment", paymentSchema)

module.exports = ConnectionRequest