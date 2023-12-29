const userModel = require("../model/userSchema")
const signup =async(req,res)=>{
    const {name ,email,password, comfirmPassword} = req.body;
   try {
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