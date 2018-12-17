/**
 * @file Stanza - Format data in Stanza (xml) format
 * @author guillain <guillain.sanchez@dimensiondata.com>
 * @license LGPL-3.0
 */

const xml = require('@xmpp/xml');

exports.format = function(message, body) {
	let to = message.user;
	let type = message.group ? 'groupchat' : 'chat';    

    let reply_message = {};
    reply_message.text = body;
    reply_message.stanza = xml`<message to="${to}" type="${type}"><body>${body}</body><html xmlns="http://jabber.org/protocol/xhtml-im"><body xmlns="http://www.w3.org/1999/xhtml"><div class="container"> <h6>${body}</h6><button class="btn btn-primary btn-sm center-block" style="margin-top:8px;" robot-type="robot-button" type="button" robot-message="help">Send back help message</button></div></body></html></message>`;
	return reply_message;
};

exports.btn_meeting = function(name, title, jids){
	let msg_str  = '<div class="container">';
    msg_str += '  <form class="form-horizontal">';
    msg_str += '    <div class="col-sm-offset-2 col-sm-10">';
    msg_str += '      <input type="hidden" class="form-control" name="command" value="startmeeting:'+jids+'"/>';
    msg_str += '      <button class="btn btn-primary btn-sm center-block" style="margin-top:8px" robot-type="robot-executecommand" type="button">'+title+'</button>';
    msg_str += '    </div>';
    msg_str += '  </form>';
    msg_str += '</div>';
    return msg_str;
};

exports.msg = function(bot, message){
    console.log(">>>>>", "message", message);

    let reply_message = {};
    let to = message.user;
    let type = message.group ? 'groupchat' : 'chat';
    let body = 'robot-button demo(only for Jabber Windows)';
    reply_message.text = body;

    console.log(">>>>>", "to", to);
    console.log(">>>>>", "type", type);

    bot.reply(message, reply_message);
    reply_message.stanza = xml`<message to="${to}" type="${type}"><body>${body}</body><html xmlns="http://jabber.org/protocol/xhtml-im"><body xmlns="http://www.w3.org/1999/xhtml"><div class="container"><h6>${body}</h6><button class="btn btn-primary btn-sm center-block" style="margin-top:8px;" robot-type="robot-button" type="button" robot-message="help">Send back help message</button></div></body></html></message>`;
    console.log(">>>>>", "reply_message", reply_message);

    bot.reply(message, reply_message);
};

