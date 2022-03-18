const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

UsersSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret._id;
    }
})

UsersSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret._id;
    }
})

const Users =  mongoose.model("users", UsersSchema);

module.exports = Users;