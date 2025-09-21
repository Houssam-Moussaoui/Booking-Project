
const express=  require("express")
const router_login = express.Router()
const user = require("../controllers/user.js")


router_login.post("/",user.login)




module.exports = router_login
