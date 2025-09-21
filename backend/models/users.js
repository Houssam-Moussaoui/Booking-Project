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
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(128),
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  passhash: {
    type: DataTypes.STRING(200), 
    allowNull: false
  }
}, { timestamps: false });

const Booking = db.define("Booking", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  booking_name: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  booking_time: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, { timestamps: false });

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Booking };
