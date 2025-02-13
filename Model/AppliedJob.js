import { DataTypes } from "sequelize";
import sequelize from "../Database/db.js";
import User from "./User.js";
import Job from "./Job.js";

const AppliedJob = sequelize.define("AppliedJob", {
  applicationid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: "job_id",
    },
  }
});

// Job can have many applications
Job.hasMany(AppliedJob, { foreignKey: "job_id", onDelete: "CASCADE" });
AppliedJob.belongsTo(Job, { foreignKey: "job_id" });

// User can have many applications
User.hasMany(AppliedJob, { foreignKey: "user_id", onDelete: "CASCADE" });
AppliedJob.belongsTo(User, { foreignKey: "user_id" });

export default AppliedJob;
