const Sequelize = require('sequelize');
const db = require('../../config/db');

const PageViews = db.define('page-views', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  pageId: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.STRING
  },
  timeStamp: {
    type: Sequelize.DATE,
  },
  country: {
    type: Sequelize.STRING
  }
},{
  timestamps: false
});

module.exports = PageViews;