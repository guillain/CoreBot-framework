// Load tools library
let Log = require(__basedir + 'lib/log');

// Load required library
let Run = require('logstash-client');

// Run the function
module.exports = function(evt, message, config) {
exports.logstash = function(controller, bot, message, config, mod_conf) {
    let msg = message;
    delete msg["type"];
    msg['message_type'] = message.type || mod_conf.framework;
    msg['level'] = mod_conf.level;
    msg['type'] = mod_conf.log_type;
    msg['framework'] = mod_conf.framework;

    /*
    let msg = {
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

    let logstash = new Run({
      type: mod_conf.type,
      host: mod_conf.host,
      port: mod_conf.port
    });
    logstash.send(msg);
};

