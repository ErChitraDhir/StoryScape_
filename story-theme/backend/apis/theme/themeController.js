const Theme = require('./themeModel')

add = (req, res) => {
    console.log(req.file)
    var errorMsg = ""
    if (req.body.themeName == "")
        errorMsg += "themeName is Required \n"
    if (req.file == "")
        errorMsg += "Theme Thumbnail is Required \n"

    if (!!errorMsg) {
        res.send({
            message: errorMsg,
            status: 422,
            success: false
        })
    }
    else {
        let themeObj = new Theme()
        themeObj.themeName = req.body.themeName
        if (req.file)
            themeObj.thumbnail = "themes/" + req.file.filename
        themeObj.save()
            .then((data) => {
                res.send({
                    message: 'Theme added successfully',
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
    Theme.find(req.body)
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
        Theme.findOne({ _id: req.body._id })
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
    if (req.body.themeName == "")
        errorMsg += "themeName is Required \n"
    if (!!errorMsg) {
        res.send({
            message: errorMsg,
            status: 422,
            success: false
        })
    }
    else {
        Theme.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        message: 'Data not found',
                        status: 404,
                        success: false
                    })
                }
                else {
                    data.themeName = req.body.themeName
                    if (req.file)
                        data.thumbnail = "themes/" + req.file.filename
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
        Theme.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        message: 'Data not found',
                        status: 404,
                        success: false
                    })
                }
                else {
                    Theme.deleteOne({ _id: req.body._id })
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