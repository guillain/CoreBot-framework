/**
 * @file Logstash - log sender 
 * @author guillain <guillain.sanchez@dimensiondata.com>
 * @license Dimension Data
 */

var Logstash = require('logstash-client');

// Load config
var config = require('../config');

exports.send = function(evt, message) {
  // If BigData feature activated
  if (config.bigdata.enable == true) {
    var msg = message;
    delete msg["type"];
    msg['message_type'] = evt;
    msg['level'] = 'info';
    msg['type'] = 'bot'; 
    msg['framework'] = 'botkit';

    /*
    var msg = {
      'timestamp': new Date(),
      'id': message.id,
      'namae': message.name,
      'targetUrl': message.targetUrl,
      'resource': message.resource,
      'event': message.event,
      'orgId': message.orgId,
      'createdBy': message.createdBy,
      'appId': message.appId,
      'ownedBy': message.ownedBy,
      'status': message.status,
      'created': message.created,
      'actorId': message.actorId,

      'message_evt': evt,
      'text': message.text,
      'from': message.from,
      'user': message.user,
      'channel': message.channel,
      'data': message.data,
      'raw_message': message.raw_message,
      'level': 'info',
      'type': 'bot',
      'framework': 'botkit'
    };
    */

    var logstash = new Logstash({
      type:config.bigdata.type,
      host: config.bigdata.host, 
      port: config.bigdata.port
    });
    logstash.send(msg);
  }
};

