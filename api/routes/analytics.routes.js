const authorize = require('../middlewares/authorize.middleware');
const analyticsController = require('../controllers/analytics.controller');

module.exports = (app) => {
  app.route('/pageViewsByPageId/:pageId')
  .get(
    authorize,
    analyticsController.pageViewByPageId
  );
  app.route('/pageViewsByBrowserName/:browserName')
  .get(
    authorize,
    analyticsController.pageViewByBrowserName
  );
  app.route('/pageViewsByCountry/:country')
  .get(
    authorize,
    analyticsController.pageViewByCountry
  );
  app.route('/rateOfReturningUsers')
  .get(
    authorize,
    analyticsController.rateOfReturningUsers
  );
};