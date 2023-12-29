const userModel = require("../model/userSchema")
const emailValidator = require("email-validator")
const bcrypt = require("bcrypt")
const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Every field is required"
            })
        }
        var validEmail = emailValidator.validate(email)
        if (!validEmail) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid email"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password & confirm password don't match"
            })
        }
        const userInfo = userModel(req.body);
        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        if (error.code === 11000) {

            return res.status(400).json({
                success: false,
                message: "Account already exits"
            })
        }
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }




}

const signin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        })
    }
    try {

        const user = await userModel.findOne({
            email
        }).select("+password")

        if (!user || password !== user.password) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials"
            });
        }

        const token = user.jwtToken();
        user.password = undefined;

        const cookieOptionS = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }

        res.cookie("token", token,cookieOptionS);
        res.status(200).json({
            success:true,
            data:user
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { signup, signin }