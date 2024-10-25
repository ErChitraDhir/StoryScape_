const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:Database2024@cluster1.q8qtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("Connection error")
})
