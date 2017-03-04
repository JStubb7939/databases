var db = require('../db/index.js');
var controllers = require('../controllers/index.js');

var chatDB = db.connection;

module.exports = {
  messages: {
    get: function (callback) {
      // chatDB.connect();
      return new Promise(function(resolve, reject) {
        chatDB.query('SELECT message_text FROM messages', function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      })
      .then(function(data) {
        callback(data);
      });
          // if (err) {
          //   controllers.sendResponse(err, 'Not Found', 404);
          // } else {
          //   return results;
          // }
      // chatDB.end();
    }, // a function which produces all the messages
    post: function (message, callback) {
      // chatDB.connect();
      return new Promise(function(resolve, reject) {
        chatDB.query('INSERT INTO messages (message_text) VALUES (?);', [message], function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      })
      .then(function(data) {
        callback(data);
      });
      // chatDB.end();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      // chatDB.connect();
      return new Promise(function(resolve, reject) {
        chatDB.query('SELECT name FROM users', function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      })
      .then(function(data) {
        callback(data);
      });
          // if (err) {
          //   controllers.sendResponse(err, 'Not Found', 404);
          // } else {
          //   return results;
          // }

      // chatDB.end();
    },
    post: function (user, callback) {
      // chatDB.connect();
      return new Promise(function(resolve, reject) {
        chatDB.query('INSERT INTO users (name) VALUES (?);', [user], function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      })
      .then(function(data) {
        callback(data);
      });

      // chatDB.end();
    }
  }
};

