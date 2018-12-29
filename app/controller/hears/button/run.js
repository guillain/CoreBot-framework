// Load tools library
let Log = require(__basedir + 'lib/log');
let xml = require('@xmpp/xml');

// Exports controller function as scenario
exports.button = function(controller, bot, message, config) {
    let reply_message = {};
    let to = message.user;
    let type = message.group ? 'groupchat' : 'chat';

    let body = config.controller.hears.button.listener.button.pattern + ' demo(only for Jabber Windows)';
    reply_message.text = body;
    reply_message.stanza = xml`<message to="${to}" type="${type}"><body>${body}</body><html xmlns="http://jabber.org/protocol/xhtml-im"><body xmlns="http://www.w3.org/1999/xhtml"><div class="container"> <h6>${body}</h6><button class="btn btn-primary btn-sm center-block" style="margin-top:8px;" robot-type="config.controller.hears.button.listener.button.pattern" type="button" robot-message="help">Send back help message</button></div></body></html></message>`;
    bot.reply(message, reply_message);
};

exports.open_link = function(controller, bot, message, config) {
    let reply_message = {};
    let to = message.user;
    let type = message.group ? 'groupchat' : 'chat';

    let body = config.controller.hears.button.listener.open_link.pattern + ' demo(only for Jabber Windows)';
    reply_message.text = body;
    reply_message.stanza = xml`<message to="${to}" type="${type}"><body>${body}</body><html xmlns="http://jabber.org/protocol/xhtml-im"><body xmlns="http://www.w3.org/1999/xhtml"><div class="container"> <h6>${body}</h6> <form class="form-horizontal"> <div class="col-sm-offset-2 col-sm-10"><input type="hidden" class="form-control" name="openlink" value="https://help.webex.com/community/jabber"/> <button class="btn btn-primary btn-sm center-block" style="margin-top:8px" robot-type="config.controller.hears.button.listener.open_link.pattern" type="button">Open Jabber help page</button></div> </form> </div></body></html></message>`;
    bot.reply(message, reply_message);
};

exports.execute_command= function(controller, bot, message, config) {
    let reply_message = {};
    let to = message.user;
    let type = message.group ? 'groupchat' : 'chat';
    let mention_jids = tools.ExtractMentionJids(message);
    let mentionJids = "";
    for (let i = 0; i < mention_jids.length; i++) {
        mentionJids += mention_jids[i];
        mentionJids += ";";
    }

    let body = config.controller.hears.button.listener.execute_command.pattern + ' demo(only for Jabber Windows)';
    reply_message.text = body;
    reply_message.stanza = xml`<message to="${to}" type="${type}"><body>${body}</body><html xmlns="http://jabber.org/protocol/xhtml-im"><body xmlns="http://www.w3.org/1999/xhtml"><div class="container"> <h6>${body}</h6> <form class="form-horizontal"> <div class="col-sm-offset-2 col-sm-10"><input type="hidden" class="form-control" name="command" value="startgroupchat:${mentionJids}"/> <button class="btn btn-primary btn-sm center-block" style="margin-top:8px" robot-type="robot-executecommand" type="button">Start Group Chat</button></div> </form> <form class="form-horizontal"> <div class="col-sm-offset-2 col-sm-10"><input type="hidden" class="form-control" name="command" value="startconference:${mentionJids}"/> <button class="btn btn-primary btn-sm center-block" style="margin-top:8px" robot-type="robot-executecommand" type="button">Start Conference</button></div> </form> <form class="form-horizontal"> <div class="col-sm-offset-2 col-sm-10"><input type="hidden" class="form-control" name="command" value="startmeeting:${mentionJids}"/> <button class="btn btn-primary btn-sm center-block" style="margin-top:8px" robot-type="config.controller.hears.button.listener.execute_command.pattern" type="button">Start Meeting</button></div> </form> </div></body></html></message>`;
    bot.reply(message, reply_message);
};

exports.submit = function(controller, bot, message, config) {
    let reply_message = {};
    let to = message.user;
    let type = message.group ? 'groupchat' : 'chat';

    let body = config.controller.hears.button.listener.submit.pattern + ' demo(only for Jabber Windows)';
    reply_message.text = body;
    reply_message.stanza = xml`<message to="${to}" type="${type}"><body>${body}</body><html xmlns="http://jabber.org/protocol/xhtml-im"><body xmlns="http://www.w3.org/1999/xhtml"><div class="container"><h5> Please enter the meeting information:</h5><form class="form-horizontal" onsubmit="return false;"><div class="form-group-sm"><label class="control-label col-sm-2" for="required_attendees">Required Attendees</label><div class="col-sm-10"><input type="text" class="form-control" id="required_attendees" placeholder="Enter jid of required attendees, like john@cisco.com;mick@cisco.com" name="required_attendees"/></div></div><div class="form-group-sm"><label class="control-label col-sm-2" for="subject">Subject:</label><div class="col-sm-10"><select class="form-control" id="subject" name="subject"><option>Botkit</option><option>JabberBot SDK</option><option>Mindmeld</option></select></div></div><div class="form-group-sm"><label class="control-label col-sm-2" for="topics">Topics:</label><div class="col-sm-10"><label class="checkbox-inline"><input type="checkbox" value="Deep Learning" name='topics'/>Deep Learning</label><label class="checkbox-inline"><input type="checkbox" value="Neural Networks"  name='topics'/>Neural Networks</label><label class="checkbox-inline"><input type="checkbox" value="Machine Learning" name='topics'/>Machine Learning</label></div></div><div class="form-group-sm"><label class="control-label col-sm-2" for="body">Body:</label><div class="col-sm-10"><textarea class="form-control" rows="5" placeholder="Enter invitation of this meeting"  id="body" name="body"/></div></div><div class="form-group-sm"><label class="control-label col-sm-2" for="location">Location:</label><div  class="col-sm-10"><label class="radio-inline"><input type="radio" name="location" value="Great Wall"/>Great Wall</label><label class="radio-inline"><input type="radio" name="location" value="Big Ben"/>Big Ben</label><label class="radio-inline"><input type="radio" name="location" value="Grand Canyon"/>Grand Canyon</label></div></div><div class="form-group-sm"><label class="control-label col-sm-2" for="start">Start:</label><div class="col-sm-10"><input name="start" type="datetime-local" value="2018-01-01T14:00:00"/></div></div><div class="form-group-sm"><label class="control-label col-sm-2" for="end">End:</label><div class="col-sm-10"><input name="end" type="datetime-local"  value="2018-01-01T13:00:00"/></div></div><div class="form-group-sm"><div class="col-sm-offset-2 col-sm-10"><button class="btn btn-primary btn-sm" style="margin-top:8px"  robot-type="config.controller.hears.button.listener.submit.pattern" type="button" value="Submit">Submit</button></div></div></form></div></body></html></message>`;

    bot.startConversation(message, function (err, convo) {
        if (!err) {
            convo.ask(reply_message, function (response, convo) {
                try {
                    if (response.from_jid === bot.client_jid) {
                        return;
                    }
                    let query = JSON.parse(response.text);

                    let replay_meeting_info = "You submit the following information:";
                    replay_meeting_info += "Required Attendees:" + query.required_attendees + ";";
                    replay_meeting_info += "Subject:" + query.subject + ";";
                    replay_meeting_info += "Body:" + query.body + ";";
                    replay_meeting_info += "Topics:" + query.topics + ";";
                    replay_meeting_info += "Location:" + query.location + ";";
                    replay_meeting_info += "Start:" + query.start + ";";
                    replay_meeting_info += "End:" + query.end + "";
                    bot.reply(message, replay_meeting_info);
                    convo.stop();
                } catch (err) {
                    Log.error('component button error ' + err.message);
                    convo.stop();
                }
            });
        }
    });
};
