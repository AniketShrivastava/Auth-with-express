const express = require("express");
const { signup, signin } = require("../authController/authController");
const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.get("/signin",signin)



module.exports = authRouter;