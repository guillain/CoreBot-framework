var assert = require('assert');
var sinon = require('sinon');

var User = require(__basedir + 'lib/user');

var run = require('./run');

describe('controller/hears/hello', function () {
  it('hello from unknown client', function (done) {
    var message = {}
    let bot = {
      reply: function(message, reply) {
        assert.equal(reply, "Hello, I am Dana and I am here to help you. Type help for further information.")
        done()
      }
    }
    var controller = {} // no api
    run.hello(controller, bot, message, undefined, undefined)

  })

  it('hello from basic client', function (done) {
    var message = {
      "user": "azertyuiop" // Basic clients only have this field set
    }
    let bot = {
      reply: function(message, reply) {
        assert.equal(reply, "Hello, I am Dana and I am here to help you. Type help for further information.")
        done()
      }
    }
    var controller = {} // no api
    run.hello(controller, bot, message, undefined, undefined)

  })

  it('hello from advanced client (firstname)', function (done) {
    var message = {
    }
    var user = {
      "displayName": "First Last",
      "firstName": "First",
      "lastName": "Last"
    }
    sinon.stub(User, 'get_user_details').callsArgWith(2, user)

    let bot = {
      reply: function(message, reply) {
        assert.equal(reply, "Hello First, I am Dana and I am here to help you. Type help for further information.")
        done()
      }
    }
    var controller = {}
    run.hello(controller, bot, message, undefined, undefined)
    User.get_user_details.restore()
  })

  it('hello from advanced client (displayname)', function (done) {
    var message = {
    }
    var user = {
      "displayName": "First Last"
    }
    sinon.stub(User, 'get_user_details').callsArgWith(2, user)

    let bot = {
      reply: function(message, reply) {
        assert.equal(reply, "Hello First Last, I am Dana and I am here to help you. Type help for further information.")
        done()
      }
    }
    var controller = {}
    run.hello(controller, bot, message, undefined, undefined)
    User.get_user_details.restore()
  })
})
