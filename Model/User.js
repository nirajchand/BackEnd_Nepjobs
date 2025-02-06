const { DataTypes } = require("sequelize");

const sequelize = require("../Database/db");

const user = sequelize.define("usertable", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true,
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usertype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = user;
