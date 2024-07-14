const User = require("./userModel")
const bcrypt = require("bcrypt")
const saltround = 10
const jwt = require("jsonwebtoken")
const secretkey = "MyProject@123"

login = (req, res) => {
    errors = ""
    if (req.body.email == "")
        errors += "Email is required\n"

    if (req.body.password == "")
        errors += "Password is required\n"

    if (!!errors) {
        res.json({
            message: errors,
            status: 422,
            success: false
        })
    }
    else {
        User.findOne({ email: req.body.email })
            .then(userdata => {
                if (userdata == null) {
                    res.json({
                        message: "No user found",
                        status: 404,
                        success: false
                    })
                }
                else {
                    //password compare
                    bcrypt.compare(req.body.password, userdata.password, function (err, data) {
                        // console.log(data)
                        if (!data) {
                            res.json({
                                message: "Invalid Password",
                                status: 422,
                                success: false
                            })
                        }
                        else {
                            let mydata = {
                                id: userdata._id,
                                email: userdata.email,
                            }
                            var mytoken = jwt.sign(mydata, secretkey)
                            res.json({
                                message: 'Login successfully',
                                status: 200,
                                success: true,
                                data: userdata,
                                token: mytoken
                            })
                        }
                    })
                }
            })
            .catch(err => {
                res.json({
                    message: err,
                    status: 500,
                    success: false
                })
            })
    }
}

register = (req, res) => {
    errors = ""
    if (req.body.email == "")
        errors += "Email is required\n"

    if (req.body.password == "")
        errors += "Password is required\n"

    if (!!errors) {
        res.json({
            message: errors,
            status: 422,
            success: false
        })
    }
    else {
        User.findOne({ email: req.body.email })
            .then(userdata => {
                if (userdata == null) {
                    let userObj = new User()
                    userObj.name = req.body.name
                    userObj.userType = 'Reader'
                    userObj.email = req.body.email
                    userObj.password = bcrypt.hashSync(req.body.password,saltround)
                    userObj.contact = req.body.contact
                    userObj.address = req.body.address
                    userObj.save()

                    res.json({
                        message: "Reader Registered",
                        status: 200,
                        success: true
                    })

                }
                else {
                    res.json({
                        message: "Email already registered",
                        status: 422,
                        success: false
                    })
                }
            })
            .catch(err => {
                res.json({
                    message: err,
                    status: 500,
                    success: false
                })
            })
    }
}

getall = (req, res) => {
    User.find(req.body)
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
    login,register,getall
}