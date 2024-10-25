const SaveLater = require("./saveLaterModel")

add = (req, res) => {
    var errorMsg = ""
    if (req.body.userId == "")
        errorMsg += "User is Required \n"
    if (req.body.storyId == "")
        errorMsg += "Story is Required \n"

    if (!!errorMsg) {
        res.send({
            message: errorMsg,
            status: 422,
            success: false
        })
    }
    else {
        SaveLater.findOne({ $and: [{ userId: req.body.userId }, { storyId: req.body.storyId }] })
            .then(SaveLaterData => {
                // console.log(SaveLaterData)
                if (!SaveLaterData) {

                    let saveLaterObj = new SaveLater()
                    saveLaterObj.userId = req.body.userId
                    saveLaterObj.storyId = req.body.storyId
                    saveLaterObj.save()
                        .then((data) => {
                            res.send({
                                message: 'Story added successfully',
                                status: 200,
                                success: true,
                                data: data
                            })
                        })
                        .catch((err) => {
                            res.send({
                                message: err,
                                status: 500,
                                success: false
                            })
                        })
                }
                else {
                    res.send({
                        message: 'Story already added check your save later list',
                        status: 422,
                        success: false
                    })
                }
            })
            .catch(err => {
                res.send({
                    message: err,
                    status: 500,
                    success: false
                })
            })

    }
}

getall = (req, res) => {
    SaveLater.find(req.body)
        .populate('userId')
        .populate('storyId')
        .populate({ path: "storyId", populate: { path: 'themeId' } })
        .then((data) => {
            res.send({
                message: 'Data Loaded',
                status: 200,
                success: true,
                data: data
            })
        })
        .catch((err) => {
            res.send({
                message: err,
                status: 500,
                success: false
            })
        })
}

removeStory = (req, res) => {
    var errorMsg = ""
    if (req.body._id == "")
        errorMsg += "Id is Required \n"

    if (!!errorMsg) {
        res.send({
            message: errorMsg,
            status: 422,
            success: false
        })
    }
    else {
        SaveLater.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        message: 'Data not found',
                        status: 404,
                        success: false
                    })
                }
                else {
                    SaveLater.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.send({
                                message: 'Story Removed',
                                status: 200,
                                success: true,
                                data: data
                            })
                        })
                }
            })
            .catch((err) => {
                res.send({
                    message: err,
                    status: 500,
                    success: false
                })
            })
    }
}

removeStoryAnother = (req, res) => {
    var errorMsg = ""
    if (req.body.userId == "")
        errorMsg += "user is Required \n"
    if (req.body.storyId == "")
        errorMsg += "Story is Required \n"

    if (!!errorMsg) {
        res.send({
            message: errorMsg,
            status: 422,
            success: false
        })
    }
    else {
        SaveLater.findOne({ $and: [{ userId: req.body.userId }, { storyId: req.body.storyId }] })
            .then((data) => {
                if (data == null) {
                    res.send({
                        message: 'Data not found',
                        status: 404,
                        success: false
                    })
                }
                else {
                    SaveLater.deleteOne({ $and: [{ userId: req.body.userId }, { storyId: req.body.storyId }] })
                        .then(() => {
                            res.send({
                                message: 'Story Removed',
                                status: 200,
                                success: true,
                                data: data
                            })
                        })
                }
            })
            .catch((err) => {
                res.send({
                    message: err,
                    status: 500,
                    success: false
                })
            })
    }
}

module.exports = {
    add,
    getall,
    removeStory,
    removeStoryAnother
}