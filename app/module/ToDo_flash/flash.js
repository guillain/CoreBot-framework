/**
 * @file Chatbot configuration
 * @author guillain <guillain.sanchez@dimensiondata.com>
 * @license LGPL-3.0
*/

// Flash
const flash = {};
flash.enable = false;
flash.db = 'flash';
flash.msg = {};
flash.msg.default = 'Demo version is ready!';
flash.msg.intro = '**Flash message**';
flash.msg.updateok = 'Flash message updated';

// Export config
module.exports = flash;
