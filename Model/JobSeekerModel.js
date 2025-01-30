const { DataTypes } = require('sequelize');
const sequelize = require('../Database/db');
const User = require('./User');

const JobSeeker = sequelize.define('JobSeeker', {
    seekerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    skills: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

JobSeeker.belongsTo(User, { foreignKey: 'userID' });

module.exports = JobSeeker;
