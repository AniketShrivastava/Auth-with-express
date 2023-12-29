const userModel = require("../model/userSchema")
const emailValidator = require("email-validator")
const signup =async(req,res)=>{
    const {name ,email,password, comfirmPassword} = req.body;
   try {
    if(!name || !email || !password || !comfirmPassword){
        return res.status(400).json({
            success:false,
            message:"Every field is required"
        })
    }
    var validEmail = emailValidator.validate(email)
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message: "Please provide valid email"
        })
    }

    if(password !== comfirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password & confirm password don't match"
        })
    }
    const userInfo = userModel(req.body);
    const result = await userInfo.save();

    return res.status(200).json({
        success:true,
        data: result
    })
   } catch (error) {
    if (error.code === 11000) {
        
        return res.status(400).json({
            success:false,
            message:"Account already exits"
        })
    }
    return res.status(400).json({
        success:false,
        message:error.message
    })
   }



 
}

module.exports = {signup}