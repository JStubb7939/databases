var db = require('../db/index.js');
var controllers = require('../controllers/index.js');

var chatDB = db.connection;

module.exports = {
  messages: {
    get: function (callback) {
      return new Promise(function(resolve, reject) {
        chatDB.query('select messages.id, messages.message_text, messages.room, users.name from messages left outer join users on (messages.user = users.id) order by messages.id desc', function(err, results) {
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
    }, // a function which produces all the messages
    post: function (parameters, callback) {
      return new Promise(function(resolve, reject) {
        chatDB.query('insert into messages (message_text, user, room) values (?, (select id from users where name = ? limit 1), ?)', parameters, function(err, results) {
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
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function (callback) {
      return new Promise(function(resolve, reject) {
        chatDB.query('select * from users', function(err, results) {
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
    },

    post: function (user, callback) {
      return new Promise(function(resolve, reject) {
        chatDB.query('insert into users(name) values (?)', [user], function(err, results) {
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
    }
  }
};


  // solution
  //
  // module.exports = {
  //   messages: {
  //     get: function(callback) {
  //       var queryStr = 'select messages.id, messages.message_text, messages.room, users.name from messages left outer join users on (messages.user = users.id) order by messages.id desc';
  //       db.query(queryStr, function( err, results) {
  //         callback(results);
  //       });
  //     },
  //     post: function(params, callback) {
  //       var queryStr = 'insert into messages(message_text, user, room) values (?, (select id from users where name = ? limit 1), ?)';
  //       db.query(queryStr, params, function( err, results) {
  //         callback(results);
  //       });
  //     }
  //   },
  //   users: {
  //     get: function(callback) {
  //       var queryStr = 'select * from users';
  //       db.query(queryStr, function( err, results) {
  //         callback(results);
  //       });
  //     },
  //     post: function(params, callback) {
  //       var queryStr = 'insert into users(name) values (?)';
  //       db.query(queryStr, params, function( err, results) {
  //         callback(results);
  //       });
  //     }
  //   }
  // };

// var query = function(str, params, callback) {
//   if (params) {
//     db.query(str, params function(err, results) {
//       callback(results);
//     });
//   } else {
//     db.query(str, function(err, results) {
//       callback(results);
//     });
//   }
// };
