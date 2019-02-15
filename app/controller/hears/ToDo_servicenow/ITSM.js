/**
 * @file Chatbot configuration
 * @author guillain <guillain.sanchez@dimensiondata.com>
 * @license LGPL-3.0
*/

// ITSM
var ITSM = {};
ITSM.enable = false;
ITSM.url = '';
ITSM.auth = '';
ITSM.nbroldmsg = '5';
ITSM.msg = {};
ITSM.msg.title = 'SD-bot';
ITSM.msg.creationok = '**Ticket** created successfuly';
ITSM.msg.creationerr = 'Issue during the creation of the **incident**';
ITSM.msg.updateok = '**Ticket** updated successfuly';
ITSM.msg.description = 'ServiceDesk Automation';
ITSM.msg.notfound = 'Not found';
ITSM.msg.nbrtotalfound = 'Number total found';

// Export config
module.exports = ITSM;
