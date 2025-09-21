require("dotenv").config();

const  express = require("express")
const app = express()

const db = require("./models/database.js");
const { User, Booking } = require("./models/users.js");

db.sync({ alter: true }).then(() => {
  console.log("Tables synchronisées avec PostgreSQL");
});



const router_login = require("./routes/login.js")
const router_signup = require("./routes/signup.js")

app.use(express.urlencoded({ extended: true }))
app.use(express.json());           
app.use(express.static("public"));

app.use("/login",router_login)
app.use("/signup",router_signup)





app.listen(4000)