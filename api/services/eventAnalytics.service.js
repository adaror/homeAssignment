const geoip = require('geoip-country');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const PageViews = require('../models/PageViews');
const PageViewsByBrowser = require('../models/PageViewsByBrowser');
const db = require('../../config/db');

function _validateEvent(event) {
  return {
    pageId: event.pageId ? event.pageId : '',
    userId: event.userId ? event.userId : '',
    timeStamp: event.timeStamp ? event.timeStamp : moment().format("YYYY-MM-DD HH:mm:ss"),
  }
}

function _getCountryByIp(userIp) {
  if (userIp) {
    const geo = geoip.lookup(userIp);
    return geo.country;
  }
  return 'no-country';
}

function _generateGuid() {
  return uuidv1();
}

function _insertEventToPageView(id, event, userCountry) {
    return PageViews.create({
      id,
      pageId: event.pageId,
      userId: event.userId,
      timeStamp: event.timeStamp,
      country: userCountry
    }).catch((err) => err);
}

function _insertEventToPageViewByBrowser(id, event, browserName) {
  return PageViewsByBrowser.create({
    pageViewId: id,
    timeStamp: event.timeStamp,
    browserName
  }).catch((err) => err);
}

async function insertEvent (event, userIp, browserName) {
  event = _validateEvent(event);
  const userCountry = _getCountryByIp(userIp);
  const pageViewGuid = _generateGuid();
  await _insertEventToPageView(pageViewGuid, event, userCountry)
  await _insertEventToPageViewByBrowser(pageViewGuid, event, browserName);
  return;
}

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