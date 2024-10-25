const Feedback = require("./feedbackModel")

add = (req, res) => {
    var errorMsg = ""
    if (req.body.name == "")
        errorMsg += "Name is Required \n"
    if (req.body.email == "")
        errorMsg += "email is Required \n"
    if (req.body.rating == "")
        errorMsg += "rating is Required \n"
    if (req.body.feedback == "")
        errorMsg += "feedback is Required \n"

    if (!!errorMsg) {
        res.send({
            message: errorMsg,
            status: 422,
            success: false
        })
    }
    else {
        let feedbackObj = new Feedback()
        feedbackObj.name = req.body.name
        feedbackObj.email = req.body.email
        feedbackObj.rating = req.body.rating
        feedbackObj.feedback = req.body.feedback
        feedbackObj.save()
            .then((data) => {
                res.send({
                    message: 'feedback added successfully',
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
    Feedback.find(req.body)
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

module.exports = {
    add,
    getall
}