var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err, data) {
        res.json(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post([req.body['message'], req.body['username'], req.body['roomname']], function(data) {
        res.json(data);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      models.messages.get(function(err, data) {
        res.json(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var data = models.users.post(req.body.username, function(data) {
        res.json(data);
      });
    } // a function which handles adding a user to the database
  }
};

// solution
//
// module.exports = {
//   messages: {
//     get: function (req, res) {
//       models.messages.get(function(err, data) {
//         res.json(results);
//       });
//     }, // a function which handles a get request for all messages
//     post: function (req, res) {
//       var params = [req.body[text], req.body[username], req.body[roomname]];
//       models.messages.post(params, function(err, results) {
//         res.json(results);
//       });
//     } // a function which handles posting a message to the database
//   },

//   users: {
//     // Ditto as above
//     get: function (req, res) {
//       models.users.get(function(err, data) {
//         res.json(results);
//       });
//     }, // a function which handles a get request for all messages
//     post: function (req, res) {
//       var params = [req.body[username]];
//       models.users.post(params, function(err, results) {
//         res.json(results);
//       });
//     } // a function which handles adding a user to the database
//   }
// };
//
// solution - orm
//
// module.exports = {
//   messages: {
//     get: function (req, res) {
//       Message.findAll({include: [User]})
//         .complete(function(err, results) {
//           res.json(results);
//         });
//       });
//     }, // a function which handles a get request for all messages
//     post: function (req, res) {
//       User.findOrCreate({username: req.body[username]})
//         .complete(function(err, user) {
//           var params = {
//             text: req.body[text],
//             userid: user.id,
//             roomname: req.body[roomname]
//           };
//           Message.create(params)
//             .complete(function(err, results) {
//               res.sendStatus(201);
//             });
//         });
//     } // a function which handles posting a message to the database
//   },

//   users: {
//     // Ditto as above
//     get: function (req, res) {
//       User.findAll()
//         .complete(function(err, results) {
//           res.json(results);
//         });
//     }, // a function which handles a get request for all messages
//     post: function (req, res) {
//       User.create({username: req.body[username]})
//         .complete(function(err, user) {
//           res.sendStatus(201);
//         });
//     } // a function which handles adding a user to the database
//   }
// };


