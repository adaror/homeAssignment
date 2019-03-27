const geoip = require('geoip-country');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const PageViews = require('../models/PageViews');
const PageViewsByBrowser = require('../models/PageViewsByBrowser');

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

module.exports = {
  insertEvent
}