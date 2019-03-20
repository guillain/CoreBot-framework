var assert = require('assert');
var sinon = require('sinon');

var User = require(__basedir + 'lib/user');

describe('lib/user/get_user_details', function () {
  it('unknown client', function (done) {
    var message = {} // nothing specific in there
    var controller = {} // no api

    User.get_user_details(controller, message, function(user) {
      assert.deepStrictEqual(user, {})
      done()
    })
  })

  it('unknown client but with personEmail', async function () {
    var message = {
      "personEmail": "ana.bcb@c.d"
    }
    var controller = {} // no api

    await User.get_user_details(controller, message, function(user) {
      assert.deepStrictEqual(user, {
        "displayName": "Ana Bcb",
        "emails": ["ana.bcb@c.d"]
      })
    })
  })

  it('unknown client but with from_jid', function (done) {
    var message = {
      "from_jid": "a.b@c.d"
    }
    var controller = {} // no api

    User.get_user_details(controller, message, function(user) {
      assert.deepStrictEqual(user, {
        "displayName": "a.b"
      })
      done()
    })
  })

  it('basic client', function (done) {
    var message = {
      "user": "azertyuiop" // Basic clients (for instance web client) will have this field set
    }
    var controller = {} // no api

    User.get_user_details(controller, message, function(user) {
      assert.deepStrictEqual(user, {
        "userId": "azertyuiop"
      })
      done()
    })
  })

  it('Spark client', function (done) {
    var message = {}
    var controller = {
      "api": {
        "sessionId": "spark-123456789",
        "people": {
          "get": sinon.stub().resolves({
            "id": "id",
            "displayName": "displayName",
            "nickName": "nickName",
            "firstName": "firstName",
            "lastName": "lastName",
            "emails": "emails"
          })
        }
      }
    }

    User.get_user_details(controller, message, function(user) {
      assert.deepStrictEqual(user, {
        "userId": "id",
        "displayName": "displayName",
        "nickName": "nickName",
        "firstName": "firstName",
        "lastName": "lastName",
        "emails": "emails"
      })
      done()
    })
    assert.equal(true, controller.api.people.get.calledOnce)
  })
})
