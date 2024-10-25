const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    rating: { type: Number },
    feedback: { type: String, default: '' },
    createdat: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("feedbacks", feedbackSchema)