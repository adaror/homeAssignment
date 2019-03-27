
const config = require('./config');
const Sequelize = require('sequelize');

module.exports = new Sequelize(
  config.mysql.database,
  config.mysql.user, 
  config.mysql.password, {
  host: config.mysql.options.host,
  port: config.mysql.options.port,
  dialect: config.mysql.dialect,
});;


  