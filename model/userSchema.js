const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")
const { Schema } = mongoose;
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        minLength: [5, "Name must be least 5 char"],
        maxLength: [15, "Name must be least 15 char"],
        trim: true

    },
    email: {
        type: String,
        required: [true, "User email is required"],
        lowercase: true,
        unique: [true, "Already registered email"],

    },
    password: {
        type: String,
        select: false
    },
   

    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpairyDate: {
        type: String

    }

},{
    timestamps:true
});

userSchema.pre ("save", async function(next){
 if(!this.isModified('password')){
    return next()
 }
 this.password = await bcrypt.hash(this.password,10)
})
userSchema.methods= {
    jwtToken(){
        return JWT.sign(
        {id: this._id, email: this.email},
        process.env.SECRET,
        {expiresIn: '24h'}
        )
    }
}

const userModel = mongoose.model("user", userSchema);
module.exports = userModel