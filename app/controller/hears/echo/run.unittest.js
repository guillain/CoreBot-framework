var assert = require('assert');
var sinon = require('sinon');

var run = require('./run');

describe('Controller echo', function () {
  it('echo should reply back the same message', function () {
    var message = {text: "abcdefg"}
    let bot = {
      reply: sinon.spy()
    }
    run.echo(undefined, bot, message, undefined, undefined)
    assert.equal(true, bot.reply.calledOnce)
    assert.equal(message, bot.reply.firstCall.args[0])
  })
})
