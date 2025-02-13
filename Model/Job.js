import { DataTypes } from "sequelize";
import sequelize from "../Database/db.js";
import User from './User.js'

const Job = sequelize.define("Job", {
  job_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobLogo:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  skillsRequired: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  applicationDeadline: {
    type:DataTypes.DATEONLY,
    allowNull: false,
  }
});

User.hasMany(Job, { foreignKey: "employer_id" });
Job.belongsTo(User, { foreignKey: "employer_id" });

export default Job;
