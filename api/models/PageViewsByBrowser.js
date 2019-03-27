const Sequelize = require('sequelize');
const db = require('../../config/db');

const PageViewsByBrowser = db.define('pageViewByBrowser', {
  pageViewId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  browserName: {
    type: Sequelize.STRING
  },
  timeStamp: {
    type: Sequelize.DATE
  }
},{
  timestamps: false
});

module.exports = PageViewsByBrowser;