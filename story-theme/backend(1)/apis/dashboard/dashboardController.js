const Theme = require('../theme/themeModel')
const Story = require('../story/storyModel')
const User = require('../user/userModel')

dashboard = async (req,res) => {
    totalThemes = 0
    totalStories = 0
    totalReaders = 0
    
    totalThemes = await Theme.countDocuments()
    totalStories = await Story.countDocuments()
    totalReaders = await User.find({userType:'Reader'}).countDocuments()

    res.send({
        message: 'Dashboard Loaded',
        status: 200,
        success: true,
        total_themes : totalThemes,
        total_stories : totalStories,
        total_readers : totalReaders
    })
}

module.exports = {
    dashboard
}