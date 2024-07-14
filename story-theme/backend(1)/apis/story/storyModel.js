const mongoose = require("mongoose")

const storySchema = new mongoose.Schema({
    themeId: { type: mongoose.Schema.Types.ObjectId, ref: 'themes', default: '' },
    storyTitle: { type: String, default: '' },
    storyWriter: { type: String, default: '' },
    description: { type: String, default: '' },
    thumbnail: { type: String, default: 'no_image.jpg' },
    status: { type: Boolean, default: true },
    createdat: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("stories", storySchema)