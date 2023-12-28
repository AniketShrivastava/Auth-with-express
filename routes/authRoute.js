const express = require("express");
const { signup } = require("../authController/authController");
const authRouter = express.Router()

authRouter.post("/signup",signup)


module.exports = authRouter;