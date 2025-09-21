require("dotenv").config();

const  express = require("express")
const app = express()
const RouterUsers = require("./routes/users.js")


app.use(express.json());           
app.use(express.static("public"));


// app.get("/",(req,res,next) => {
//     console.log("hi")
//     res.send("hello")
// })


app.post("/", (req,res) => {
    console.log(req.body); // { nom: "xxx", prenom: "yyy" }
    res.send("Login reçu !");
});



app.use("/users",RouterUsers)

app.listen(4000)