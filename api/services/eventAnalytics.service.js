const PageViews = require('../models/PageViews');
const db = require('../../config/db');

function _getPageViewByPageId(pageId) {
  return PageViews.findAll({
    where: {
      pageId
    }
  }).catch((err) => console.error(err));
}

async function getPageViewByPageId(pageId) {
const pageViewsByPageId = await _getPageViewByPageId(pageId);
return pageViewsByPageId;
}

function _getPageViewsByBrowserNameQuery(browserName) {
  if (browserName) {
    return "SELECT * FROM `page-views` WHERE `id` IN (SELECT pageViewId FROM `pageviewbybrowsers` WHERE `browserName` = " 
    + "'" + browserName +"')";
  }
 }

async function _getPageViewByBrowserName(query) {
  try {
    return await db.query(query,{type: db.QueryTypes.SELECT});
  }catch(err) {
    console.error(err);
    return [];
  }
}

async function getPageViewsByBrowserName(browserName) {
  const query = _getPageViewsByBrowserNameQuery(browserName);
  const pageViewsByBrowserName = await _getPageViewByBrowserName(query);
  return pageViewsByBrowserName;
}

function _getPageViewByCountry(country) {
  return PageViews.findAll({
    where: {
      country
    }
  }).catch((err) => err);
}

async function getPageViewByCountry(country) {
const pageViewsByCountry = await _getPageViewByCountry(country);
return pageViewsByCountry;
}

function _getRateOfReturningUsersQuery() {
  return "SELECT `userId`, COUNT(*) AS numOfEntrances FROM `page-views` GROUP BY `userId` HAVING COUNT(*) > 1"
}

async function _getRateOfReturningUsers(query) {
  try {
    return await db.query(query,{type: db.QueryTypes.SELECT});
  }catch(err) {
    console.error(err);
    return [];
  }
}

async function getRateOfReturningUsers() {
  const query = _getRateOfReturningUsersQuery();
  const rateOfReturningUsers = await _getRateOfReturningUsers(query);
  return rateOfReturningUsers;
}


module.exports = {
  insertEvent,
  getPageViewByPageId,
  getPageViewsByBrowserName,
  getPageViewByCountry,
  getRateOfReturningUsers
}