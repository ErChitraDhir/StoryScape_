const mongoose = require("mongoose")

const saveLaterSchema = new mongoose.Schema({
    storyId: { type: mongoose.Schema.Types.ObjectId,ref:'stories', default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId,ref:'users', default: '' },
    status: { type: Boolean, default: true },
    createdat: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("saveForLaters", saveLaterSchema)