const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    contact: { type: Number,default: '' },
    address: { type: String, default:'' },
    status: { type: Boolean, default: true },
    userType: { type: String, default: "Reader" },//Admin , Reader
    createdAt: { type: Date, default: Date.now() }
})

module.exports = new mongoose.model("users", userSchema)