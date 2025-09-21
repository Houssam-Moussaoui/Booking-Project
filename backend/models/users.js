const { DataTypes } = require("sequelize");
const db = require("./database.js");

const User = db.define("User", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(128),
    validate: {
      is: /^[a-z\-'\s]{1,128}$/i
    }
  },
  email: {
    type: DataTypes.STRING(128),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passhash: {
    type: DataTypes.STRING(60),
    validate: {
      is: /^[0-9a-z\\/$.]{60}$/i
    }
  }
}, { timestamps: false });

module.exports = User;
