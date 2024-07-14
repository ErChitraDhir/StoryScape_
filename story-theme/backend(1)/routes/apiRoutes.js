const routes = require("express").Router()
const multer = require('multer')
const userController = require("../apis/user/userController")
const feedbackController = require("../apis/feedback/feedbackController")
const themeController = require("../apis/theme/themeController")
const storyController = require("../apis/story/storyController")
const dashboardController = require("../apis/dashboard/dashboardController")
const saveLaterController = require("../apis/saveLater/saveLaterController")

const themestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/themes')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const themeupload = multer({ storage: themestorage })

const storystorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/stories')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})
const storyupload = multer({ storage: storystorage })


//user apis start 
routes.post("/login", userController.login)
routes.post("/register", userController.register)
//user apis end 

routes.post("/theme/getall", themeController.getall)
routes.post("/theme/getsingle", themeController.getsingle)

routes.post("/story/getall", storyController.getall)
routes.post("/story/getsingle", storyController.getsingle)

routes.use(require("../config/middleware"))

//Dashboard api start 
routes.post("/dashboard", dashboardController.dashboard)
//Dashboard api end

//user apis start 
routes.post("/users/getall", userController.getall)
//user apis end

//theme apis start 
routes.post("/theme/add", themeupload.single('thumbnail'), themeController.add)
// routes.post("/theme/getall", themeController.getall)
// routes.post("/theme/getsingle", themeController.getsingle)
routes.post("/theme/update", themeupload.single('thumbnail'), themeController.update)
routes.post("/theme/delete", themeController.deletedata)
//theme apis end 

//Stories apis start 
routes.post("/story/add", storyupload.single('thumbnail'), storyController.add)
// routes.post("/story/getall", storyController.getall)
// routes.post("/story/getsingle", storyController.getsingle)
routes.post("/story/update", storyupload.single('thumbnail'), storyController.update)
routes.post("/story/delete", storyController.deletedata)
//Stories apis end 

//feedback apis start 
routes.post("/feedback/add", feedbackController.add)
routes.post("/feedback/getall", feedbackController.getall)
//feedback apis end 

//save for later apis start 
routes.post("/saveLater/add", saveLaterController.add)
routes.post("/saveLater/getall", saveLaterController.getall)
routes.post("/saveLater/removestory", saveLaterController.removeStory)
routes.post("/saveLater/removestoryanother", saveLaterController.removeStoryAnother)
//save for later apis end 


module.exports = routes