require("dotenv").config();

const  express = require("express")
const app = express()
const RouterUsers = require("./routes/users.js")

app.get("/",(req,res,next) => {
    console.log("hi")
    res.send("hello")
})



app.use("/users",RouterUsers)

app.listen(4000)