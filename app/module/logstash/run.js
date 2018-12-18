let Run = require('logstash-client');

exports.run = function(evt, message, config) {
    let msg = message;
    delete msg["type"];
    msg['message_type'] = evt;
    msg['level'] = config.module.logstash.level;
    msg['type'] = config.module.logstash.log_type;
    msg['framework'] = config.module.logstash.framework;

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
      type: config.module.logstash.type,
      host: config.module.logstash.host,
      port: config.module.logstash.port
    });
    logstash.send(msg);
};

