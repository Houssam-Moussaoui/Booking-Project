
const express=  require("express")
const router_signup = express.Router()
const user = require("../controllers/user.js")



router_signup.post("/",user.newUser)





module.exports = router_signup
