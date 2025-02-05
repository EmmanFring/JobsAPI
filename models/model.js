const { DataTypes } = require("sequelize");
const { sequelizeConfig } = require("../database/config");
// Create table schema
const Users = sequelizeConfig.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Jobs = sequelizeConfig.define("Jobs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  addedBy: { type: DataTypes.INTEGER, references: { model: Users, key: "id" } },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  company: DataTypes.STRING,
  salary: DataTypes.INTEGER,
});

module.exports = { Jobs, Users };
