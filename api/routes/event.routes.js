const authorize = require('../middlewares/authorize.middleware');
const eventController = require('../controllers/event.controller');

module.exports = app => {
  app.route('/addNewEvent')
  .post(
    authorize,
    eventController.addNewEvent
  );
}