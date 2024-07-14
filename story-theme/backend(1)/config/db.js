const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/storyscape")
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("Connection error")
})
