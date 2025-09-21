

const status = require('http-status')
const userModel = require('../models/users.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const bcrypt = require('bcrypt')
const jws = require('jws')


function validPassword (password) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
}

module.exports = {
    async login (req, res) {

    if (!has(req.body, ['email', 'password'])) throw new CodeError('You must specify the email and password', status.BAD_REQUEST)
    const { email, password } = req.body
    const user = await userModel.findOne({ where: { email } })
    if (user) {
      if (await bcrypt.compare(password, user.passhash)) {
        const token = jws.sign({ header: { alg: 'HS256' }, payload: email, secret: TOKENSECRET })
        res.json({ status: true, message: 'Login/Password ok', token })
        return
      }
    }
    res.status(status.FORBIDDEN).json({ status: false, message: 'Wrong email/password' })
    },
    async newUser (req, res) {
        if (!has(req.body, ['name', 'email', 'password'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
        const { name, email, password } = req.body
        console.log(req.body)
        if (!validPassword(password)) throw new CodeError('Weak password!', status.BAD_REQUEST)
        await userModel.create({ name, email, passhash: await bcrypt.hash(password, 2) })
        res.json({ status: true, message: 'User Added' })
    },
    async getUsers (req, res) {
        const data = await userModel.findAll({ attributes: ['id', 'name', 'email'] })
        res.json({ status: true, message: 'Returning users', data })
    }
}
