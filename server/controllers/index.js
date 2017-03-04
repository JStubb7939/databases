var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err, data) {
        exports.sendResponse(res, data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log(req.body.message);
      models.messages.post(req.body.message, function(data) {
        exports.sendResponse(res, data, 201);
      });
      // exports.collectData(req, function(message) {
      //   models.messages.post(message);
      // });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.messages.get(function(err, data) {
        exports.sendResponse(res, data);
      });
      //exports.sendResponse(res, {results: models.users.get()});
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log(req.body.username);
      var data = models.users.post(req.body.username, function(data) {
        exports.sendResponse(res, data, 201);
      });
      // exports.collectData(req, function(user) {
      //   console.log('user ' + user);
      //   models.users.post(user);
      // });
    } // a function which handles adding a user to the database
  }
};

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

exports.sendResponse = function(res, data, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
};

exports.collectData = function(req, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  console.log('data ' + data);
  req.on('end', function() {
    callback(JSON.parse(data));
  });
};

