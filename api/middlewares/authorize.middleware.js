const httpStatuses = require('../utils/httpStatuses');
const config = require('../../config/config');

function authorize(req, res, next) {
  const userAuthToken = req.headers && req.headers.authorization;
  const isUserAuthTokenMatch = userAuthToken && userAuthToken === config.accessId;
  if (isUserAuthTokenMatch) {
    return next();
  }

  res.status(httpStatuses.unauthorized).json({error: 'user unauthorized'});
}

module.exports = authorize;