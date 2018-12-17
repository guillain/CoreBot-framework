/**
 * @file Chatbot configuration
 * @author guillain <guillain.sanchez@dimensiondata.com>
 * @license LGPL-3.0
*/

// Search
const search = {};
search.enable = true;
search.limit = '10';
search.msg = {};
search.msg.help = 'Search engine';
search.msg.found = 'Search result';
search.msg.notfound = 'No result found';

// Export config
module.exports = search;
