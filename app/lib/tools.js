// Load required lib
var Log = require(__basedir + 'lib/log');

// Exports datetime string
exports.toUTCDateTimeString = function(date) {
    var yyyy = date.getUTCFullYear();
    var mm = date.getUTCMonth() < 9 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1); // getMonth() is zero-based
    var dd = date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
    var hh = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
    var min = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
    var ss = date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds();
    return "".concat(yyyy).concat('-').concat(mm).concat('-').concat(dd).concat('T').concat(hh).concat(':').concat(min).concat(':').concat(ss);
};

// Exports the Jids mentionned
exports.ExtractMentionJids = function(bot, message) {
    var direct_mention_reg = /href="xmpp:\s?(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)\s?"/ig;
    var email_reg = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/i;
    var match = message.stanza.toString().match(direct_mention_reg);
    var mention_jids = [];
    if (match) {
        for (var i = 0; i < match.length; i++) {
            var jid_match = match[i].match(email_reg);
            if (jid_match) {
                var jid = jid_match[0];
                if (jid != bot.client_jid) {
                    mention_jids.push(jid);
                }
            }
        }
    }
    return mention_jids;
};

