
const {DataTypes} = require('sequelize')

const sequelize = require("../Database/db");

const user = sequelize.define('usertable',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    usertype:{
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    }
})

module.exports = user