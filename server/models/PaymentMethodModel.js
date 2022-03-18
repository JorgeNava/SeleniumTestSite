const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentMethodSchema = new Schema({
    ownerUserId: {
        type: String,
        required: true,
    },
    methodIdentifier: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    },
    billingAdress: {
        type: String,
        required: true,
    },
});

PaymentMethodSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret._id;
    }
})

PaymentMethodSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret._id;
    }
})

const PaymentMethod =  mongoose.model("paymentMethods", PaymentMethodSchema);

module.exports = PaymentMethod;