require("dotenv").config();

const  express = require("express")
const app = express()
const session = require("express-session");
const db = require("./models/database.js");
const { User, Booking } = require("./models/users.js");

db.sync({ alter: true }).then(() => {
  console.log("Tables synchronisées avec PostgreSQL");
});


const isProd = process.env.NODE_ENV === 'production';
if (isProd) app.set('trust proxy', 1); // derrière proxy du PaaS

app.use(session({
  name: "sid",
  secret: process.env.TOKENSECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd,       // cookie via HTTPS seulement en prod
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 30 // 30 min
  }
}));





const router_login = require("./routes/login.js")
const router_signup = require("./routes/signup.js")

const retour_login = require("./util/retour.js")

app.use(express.urlencoded({ extended: true }))
app.use(express.json());           
app.use(express.static("public"));

app.use("/login",router_login)
app.use("/signup",router_signup)




const router_reservations = require("./routes/reservations.js");

app.use("/reservations", router_reservations);

const path = require("path");

app.get("/menu.html", retour_login, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "menu.html"));
});


app.get("/reservation.html", retour_login, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "reservation.html"));
});



// Logout 
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
        console.error("Erreur logout:", err);
        return res.status(500).send("Erreur lors de la déconnexion");
        }
        res.clearCookie("sid");    
        return res.redirect("/index.html");
    });
});
  



// app.listen(4000)


// démarre le serveur seulement si exécuté directement
if (require.main === module) {
  app.listen(4000, () => {
    console.log("Serveur en écoute sur le port 4000");
  });
}

module.exports = app; // pour Jest