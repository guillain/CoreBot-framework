/* Thanks to: Howdyai
 * Url: https://github.com/howdyai/botkit-starter-web/blob/master/components/express_webserver.js
 */
var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('botkit:webserver');
var http = require('http');
var fs = require('fs');
var hbs = require('express-hbs');


module.exports = function(controller, config) {
    var webserver = express();
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));

    // set up handlebars ready for tabs
    webserver.engine('hbs', hbs.express4({partialsDir: __basedir + 'launcher/web/views/partials'}));
    webserver.set('view engine', 'hbs');
    webserver.set('views', __basedir + 'launcher/web/views/');

    webserver.use(express.static(__basedir + 'launcher/web/public'));

    var server = http.createServer(webserver);

    server.listen(config.launcher.web.port || 3000, null, function() {
        debug('Express webserver configured and listening at http://localhost:' + config.launcher.web.port || 3000);
    });
    controller.webserver = webserver;
    controller.httpserver = server;

    return controller;
};
