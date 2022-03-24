const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServicesRequestSchema = new Schema({
    internalId: {
        type: String,
        required: true,
        unqiue: true,
    },
    username: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

ServicesRequestSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret._id;
    }
})

ServicesRequestSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret._id;
    }
})

const ServicesRequest =  mongoose.model("servicesRequest", ServicesRequestSchema);

module.exports = ServicesRequest;