const Story = require('./storyModel')

add = (req, res) => {
    var errorMsg = ""
    if (req.body.themeId == "")
        errorMsg += "theme is Required \n"
    if (req.body.storyTitle == "")
        errorMsg += "Story Title is Required \n"
    if (req.body.storyWriter == "")
        errorMsg += "story writer is Required \n"
    if (req.body.description == "")
        errorMsg += "description is Required \n"
    if (req.file == "")
        errorMsg += "Thumbnail is Required \n"

    if (!!errorMsg) {
        res.send({
            message: errorMsg,
            status: 422,
            success: false
        })
    }
    else {
        let storyObj = new Story()
        storyObj.themeId = req.body.themeId
        storyObj.storyTitle = req.body.storyTitle
        storyObj.storyWriter = req.body.storyWriter
        storyObj.description = req.body.description
        if (req.file)
            storyObj.thumbnail = "stories/" + req.file.filename
        storyObj.save()
            .then((data) => {
                res.send({
                    message: 'story added successfully',
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
}

getall = (req, res) => {
    Story.find(req.body)
        .populate('themeId')
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

getsingle = (req, res) => {
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
        Story.findOne({ _id: req.body._id })
            .populate('themeId')
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
}

update = (req, res) => {
    var errorMsg = ""
    if (req.body._id == "")
        errorMsg += "Id is Required \n"
    if (req.body.themeId == "")
        errorMsg += "themeId is Required \n"
    if (req.body.storyTitle == "")
        errorMsg += "Story Title is Required \n"
    if (req.body.storyWriter == "")
        errorMsg += "story writer is Required \n"
    if (req.body.description == "")
        errorMsg += "description is Required \n"

    if (!!errorMsg) {
        res.send({
            message: errorMsg,
            status: 422,
            success: false
        })
    }
    else {
        Story.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        message: 'Data not found',
                        status: 404,
                        success: false
                    })
                }
                else {
                    data.themeId = req.body.themeId
                    data.storyTitle = req.body.storyTitle
                    data.storyWriter = req.body.storyWriter
                    data.description = req.body.description
                    if (req.file)
                        data.thumbnail = "stories/" + req.file.filename
                    data.save()
                    res.send({
                        message: 'Data Updated',
                        status: 200,
                        success: true,
                        data: data
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

deletedata = (req, res) => {
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
        Story.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        message: 'Data not found',
                        status: 404,
                        success: false
                    })
                }
                else {
                    Story.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.send({
                                message: 'Record Deleted',
                                status: 200,
                                success: true
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
    add, getall, getsingle, update, deletedata
}