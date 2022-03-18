const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    internalId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    cost: {
        type: Number,
        required: true,
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
});

ProductsSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret._id;
        return ret
    }
})

ProductsSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret._id;
        return ret
    }
})

const Product =  mongoose.model("products", ProductsSchema);

module.exports = Product;