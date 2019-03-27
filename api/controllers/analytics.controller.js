const httpStatuses = require('../utils/httpStatuses');
const eventAnalyticsService = require('../services/eventAnalytics.service');

async function pageViewByBrowserName(req, res) {
  try {
    const browserName = req.params && req.params.browserName ? req.params.browserName : null;
    if(!browserName) {
      res.status(httpStatuses.badRequest).json({error:'no browser name'});
    }
    const pageViews = await eventAnalyticsService.getPageViewsByBrowserName(browserName);
    res.status(httpStatuses.ok).json(pageViews);
  }
  catch(err) {
    res.status(httpStatuses.badRequest).send(err);
  }
}

async function pageViewByCountry(req, res) {
  try {
    const country = req.params && req.params.country ? req.params.country : null;
    if(!country) {
      res.status(httpStatuses.badRequest).send({error:'no country'});
    }
    const pageViews = await eventAnalyticsService.getPageViewByCountry(country);
    res.status(httpStatuses.ok).json(pageViews);
  }
  catch(err) {
    res.status(httpStatuses.badRequest).send(err);
  }
}

async function pageViewByPageId(req, res) {
  try {
    const pageId = req.params && req.params.pageId ? req.params.pageId : null;
    if(!pageId) {
      res.status(httpStatuses.badRequest).send({error:'no page id'});
    }
    const pageViewsByPageId = await eventAnalyticsService.getPageViewByPageId(pageId);
    res.status(httpStatuses.ok).json(pageViewsByPageId);
  }
  catch(err) {
    res.status(httpStatuses.badRequest).send(err);
  }
}

async function rateOfReturningUsers(req, res) {
  try {
    const returningUsers = await eventAnalyticsService.getRateOfReturningUsers();
    res.status(httpStatuses.ok).json(returningUsers);
  }
  catch(err) {
    res.status(httpStatuses.badRequest).send(err);
  }
}


module.exports = {
  pageViewByBrowserName,
  pageViewByCountry,
  pageViewByPageId,
  rateOfReturningUsers
}