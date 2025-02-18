import { DataTypes } from "sequelize";
import sequelize from "../Database/db.js";
import User from './User.js'

const JobSeeker = sequelize.define("JobSeeker", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skills: {
    type: DataTypes.TEXT,
  },
  desiredIndustry: {
    type:DataTypes.STRING,
    allowNull:false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  experienceLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(JobSeeker, { foreignKey: "userId" });
JobSeeker.belongsTo(User, { foreignKey: "userId" });

export default JobSeeker;
