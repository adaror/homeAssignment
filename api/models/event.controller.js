const httpStatuses = require('../utils/httpStatuses');
const useragent = require('useragent');
const _ = require('lodash');
const eventService = require('../services/event.service');

async function addNewEvent(req, res) {
  try {
    const event = req.body;
    const agent = useragent.parse(req.headers['user-agent']);
    const browserName = agent && agent.family;
    const userIp = req.ip;
    if(_.isEmpty(event)) {
      res.status(httpStatuses.badRequest).send({error:'no content'});
    }
    await eventService.insertEvent(event, userIp, browserName);
    res.status(httpStatuses.ok).json({message: 'event is inserted'});
  }
  catch(err) {
    res.status(httpStatuses.serverError).send(err);
  }
}

module.exports = {
  addNewEvent
}