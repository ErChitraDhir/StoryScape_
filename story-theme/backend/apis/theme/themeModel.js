const mongoose = require("mongoose")

const themeSchema = new mongoose.Schema({
    themeName: { type: String, default: '' },
    thumbnail: { type: String, default: 'no_image.jpg' },
    status: { type: Boolean, default: true },
    createdat: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("themes", themeSchema)