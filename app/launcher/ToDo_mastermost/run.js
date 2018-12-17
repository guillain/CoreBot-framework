// Configuration
var config = require('../../config');
var Botkit = require('../../botkit/lib/Botkit.js');

// Check if this BM is required
if (config.web.enable == false) {
    if (config.log.debug == 1) {
        console.log('>>> csv_data - len: ' + csv_data.length + ' - data: ' + csv_data);
    }
    return false;
}

let controller = Botkit.web({
    debug: config.log.debug,
    studio_token: config.botkit_token
});

let bot = controller.spawn({
    token: config.web.token
}).startRTM();


// Scenario declarations
let scenario = require('../../controller/loader.js');
controller = scenario.run(controller);

