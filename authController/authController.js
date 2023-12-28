const signup =(req,res)=>{
    const {name ,email,password, comfirmPassword} = req.body
 return res.status(202).json({
    success: true,
    data: {}
 })
}

module.exports = {signup}