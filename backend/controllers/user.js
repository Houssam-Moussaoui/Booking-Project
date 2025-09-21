

const status = require('http-status')
const { User, Booking } = require('../models/users.js');const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const bcrypt = require('bcrypt')
const jws = require('jws')
const TOKENSECRET = process.env.TOKENSECRET
const path = require("path");

function validPassword (password) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
}

module.exports = {
  async login (req, res) {

    if (!has(req.body, ['email', 'password'])) throw new CodeError('You must specify the email and password', status.BAD_REQUEST)
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (user) {
      if (await bcrypt.compare(password, user.passhash)) {
        const token = jws.sign({ header: { alg: 'HS256' }, payload: email, secret: TOKENSECRET })
        req.session.userId = user.id;
        req.session.userEmail = user.email;        
        // res.json({ status: true, message: 'Login/Password ok', token })
        return res.redirect("menu.html");
        
      }
    }
    res.status(403).json({ message: "Wrong email/password" });
  },
    async newUser (req, res) {
        if (!has(req.body, ['name', 'email', 'password'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
        const { name, email, password } = req.body
        console.log(req.body)
        if (!validPassword(password)) throw new CodeError('Weak password!', status.BAD_REQUEST)
        await User.create({ name, email, passhash: await bcrypt.hash(password, 2) })
        // res.json({ status: true, message: 'User Added' })
        return res.redirect("/index.html")
    },
    async getUsers (req, res) {
        const data = await User.findAll({ attributes: ['id', 'name', 'email'] })
        res.json({ status: true, message: 'Returning users', data })
    },



    async createReservation(req, res) {
        if (!req.session.userId) {
          return res.status(401).json({ message: "Not authenticated" });
        }
      
        if (!has(req.body, ["booking_name", "booking_time"])) {
          throw new CodeError("You must specify booking_name and booking_time", status.BAD_REQUEST);
        }
      
        const { booking_name, booking_time } = req.body;
      
        const booking = await Booking.create({
          booking_name,
          booking_time,
          userId: req.session.userId
        });
      
        res.json({ status: true, message: "Reservation created", booking });
    },
    async getReservations(req, res) {
        const data = await Booking.findAll({
          include: { model: User, attributes: ["id", "name", "email"] }
        });
        res.json({ status: true, message: "Returning all reservations", data });
    },
    
    async getReservationsByUser(req, res) {
        if (!req.session.userId) {
          return res.status(401).json({ message: "Not authenticated" });
        }
      
        const data = await Booking.findAll({
          where: { userId: req.session.userId }
        });
        res.json({ status: true, message: "Returning user reservations", data });
    }
    // async  deleteAllReservations(req, res) {
    //     try {
    //       const deleted = await Booking.destroy({ where: {} });
      
    //       // await Booking.destroy({ truncate: true, restartIdentity: true });
      
    //       return res.json({ status: true, message: `Réservations supprimées: ${deleted}` });
    //     } catch (err) {
    //       console.error("deleteAllReservations error:", err);
    //       return res.status(500).json({ status: false, message: "Erreur lors de la suppression" });
    //     }
    // },
    // async deleteMyReservations(req, res) {
    //     if (!req.session?.userId) {
    //       return res.status(401).json({ status: false, message: "Not authenticated" });
    //     }
    //     try {
    //       const deleted = await Booking.destroy({ where: { userId: req.session.userId } });
    //       return res.json({ status: true, message: `Vos réservations supprimées: ${deleted}` });
    //     } catch (err) {
    //       console.error("deleteMyReservations error:", err);
    //       return res.status(500).json({ status: false, message: "Erreur lors de la suppression" });
    //     }
    // }


}

