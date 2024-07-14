const movieModel = require("../apis/feedback/feedbackModel")
const User = require("../apis/user/userModel")
const bcrypt = require("bcrypt")
const saltround = 10 

exports.adminseeder = ()=>{
    User.findOne({email:'admin@storyscape.com'}).then(users => {
        if(users == null)
        {
            let userObj = new User()
            userObj.name = 'admin',
            userObj.userType = 'Admin',
            userObj.email = 'admin@storyscape.com',
            userObj.password = bcrypt.hashSync("123456",saltround)
            userObj.save()
            console.log("seeder executed")
        }  
    })

}

