// // this file is for us to make configuration and   connection to the database
require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelizeConfig = new Sequelize(
  // process.env.databasep,
  // process.env.usernamep,
  // process.env.passwordp,

  process.env.databased,
  process.env.usernamed,
  null,

  {
    host: process.env.hostd,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = { sequelizeConfig };
