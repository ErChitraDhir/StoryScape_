const jwt = require("jsonwebtoken")
const secretkey = "MyProject@123"

module.exports= (req,res,next)=>{
   var token = req.headers["authorization"]
   jwt.verify(token,secretkey,function(err,data){
    if(err != null)
    {
        
        res.json({
            message:'Unauthenicated',
            status:403,
            success:false
        })
    }else{
        req.decoded = data;  
        next()
    }
   })
}