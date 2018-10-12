/**
 * @file Chatbot configuation
 * @author guillain <guillain.sanchez@dimensiondata.com>
 * @license Dimension Data
*/

/** GLOBAL conf **/
var config = {};
config.debug = false;
config.log = 0;
config.botkit_token = '';

// Bot msg
config.msg = {};
config.msg.welcome = 'Welcome in the translator tools';
config.msg.bye = 'See you soon';
config.msg.join = 'Thanks to join us';

/** CHAT editor conf **/
// Slack conf
config.slack = {};
config.slack.name = '';
config.slack.token = '';

// Jabber conf
config.jabber = {};
config.jabber.name = 'chatbot';
config.jabber.jid = 'IPTTOLECHATBOTTESM@airbus.com';
config.jabber.password = '519646eb37d2f8438148';
config.jabber.store = './bot_store/';
config.jabber.ip = '45.9.100.91';
config.jabber.port = 5222

// Spark conf
config.spark = {};
config.spark.name = '';
config.spark.mail = '';
config.spark.botid = '';
config.spark.url = '';
config.spark.port = 3000;
config.spark.access_token = '';
config.spark.secret = '';
config.spark.webhook_name = '';

// Teams
config.teams = {};
config.teams.clientId = '';
config.teams.clientSecret = '';
config.teams.hostname = '';
config.teams.port = 3001;

// Hangouts
config.hangouts = {};
config.hangouts.endpoint = '';
config.hangouts.token = '';
config.hangouts.hostname = '';
config.hangouts.port = 3002;

/** SYSTEM conf **/
// Local DB (redis) -------------
config.db = {};
config.db.host = 'localhost';
config.db.user = 'user';

// BigData collector ------------
config.bigdata = {};
config.bigdata.enable = false;
config.bigdata.type = 'tcp';
config.bigdata.port = '5055';
config.bigdata.auth = '';
config.bigdata.host = '';

/** FEATURE conf **/
// autoreply ---------------------------
config.autoreply = {};
config.autoreply.delay = 2;
config.autoreply.enable = true;
config.autoreply.file = '/root/AutoReply/app/AutoReply.csv';
config.autoreply.msg = {};
config.autoreply.msg.help = 'When message is sent to the bot, the bot pickup one information from local source and provide it after a delay of 2s';

// CSV ---------------------------
config.csv = {};
config.csv.enable = true;
config.csv.file = '/root/AutoReply/app/local.csv';
config.csv.storage = 'csv';
config.csv.msg = {};
config.csv.msg.help = 'Used to load and test CSV file'

// Translate ---------------------
config.translate = {};
config.translate.enable = false;
// Translate default conf
config.translate.default = {};
config.translate.default.langin = 'en';
config.translate.default.langout = 'fr';
// Translate msg
config.translate.msg = {};
config.translate.msg.on = 'Auto translation _ON_';
config.translate.msg.off = 'Auto translation _OFF_';
config.translate.msg.conf = 'Auto translation configuration';
config.translate.msg.confok = 'Configuration _SAVED_';
config.translate.msg.confko = 'Issue to save the configuration';
// Help msg
config.translate.msg.help  = 'Text translation online via chat bot \n';
config.translate.msg.help += '# How to use the translation \n';
config.translate.msg.help += '## Manualy \n';
config.translate.msg.help += '[lang in] [lang out] [*/phrase] \n';
config.translate.msg.help += '- en fr I like it! \n';
config.translate.msg.help += '- fr de j\'ai un rendez-vous demain \n';
config.translate.msg.help += '## Automaticaly \n';
config.translate.msg.help += '[*/phrase] (the languages must be configured and activated before)\n';
config.translate.msg.help += '- I like it! \n';
config.translate.msg.help += '# Commands to configure auto translation\n';
config.translate.msg.help += '- on - active the auto translation \n';
config.translate.msg.help += '- off - deactive the auto translation \n';
config.translate.msg.help += '- config - provide the current config \n';
config.translate.msg.help += '- config [lang in] [lang out] - configure the auto translation \n';
config.translate.msg.help += '- state - provide the current state (on/off) \n';
config.translate.msg.help += '# Language \n';
config.translate.msg.help += 'total: 107, in summary \n';
config.translate.msg.help += '- en - English \n';
config.translate.msg.help += '- es - Spanish\n';
config.translate.msg.help += '- fr - French \n';
config.translate.msg.help += '- de - German \n';
config.translate.msg.help += '- ru - Russian \n';
config.translate.msg.help += '- it - Italian \n';
config.translate.msg.help += '- ja - Japanese \n';
config.translate.msg.help += '- ar - Arabic \n';
config.translate.msg.help += '- zh-CN - Chinese (Simplified) \n';
config.translate.msg.help += '- zh-TW - Chinese (Traditional) \n';
config.translate.msg.help += 'Full list: https://cloud.google.com/translate/docs/languages\n';

// Export config
module.exports = config;

