(function() {

  var rooms = {};
  var friends = {};

  var populateRooms = function (data) {
    data.results.forEach(function(element) {
      if (rooms[element.roomname]) {
        return;
      } else {
        rooms[element.roomname] = true;
        $('#form-control').append('<option value=' + element.roomname + '>' + element.roomname + '</option>');
      }
    });
  }

  function appendMessages(data) {
    $('#chats').empty();
    var selectedRoom = $('#form-control').val();
    data.results = data.results.filter(function(element) {
      return element.roomname === selectedRoom;
    });
    console.log(data);
    if (data.results) {
      for (startingIndex = 0; startingIndex < data.results.length; startingIndex++) {
        var message = data.results[startingIndex];
        var $message = $('<div class="individual-message ' + message.username + '"></div>');
        var $username = $('<span class="username"></span>');
        var $timestamp = $('<span class="timestamp"></span>');
        var $messageText = $('<div class="message-text"></div>');
        var dt = new Date(message.createdAt);
        var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var time = monthArray[dt.getMonth()] + ' ' + dt.getDate();
        // + ' - ' + dt.getHours() + ":" + ('0'+dt.getMinutes()).slice(-2);
        $username.text(message.username);
        $timestamp.text(time);
        $messageText.text(message.text);
        $message.prepend('@', $username, ' - ', $timestamp, $messageText);
        $('#chats').append($message);
      }
    }
  }

  function refreshRooms() {
    $.ajax({
      type: 'GET',
      url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
      data: { order: '-createdAt' },
      success: populateRooms
    });
  }

  function refreshMessages() {
    $.ajax({
      type: 'GET',
      url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
      data: { order: '-createdAt' },
      success: appendMessages
    });
  }

  refreshRooms();

  refreshMessages();

  setInterval(function() {
    refreshRooms();
    refreshMessages();
  }, 3000);


function postMessage(message) {
    var messageText = $('#new-message').val();
    if (messageText.length === 0) return;
    //var room =
    var message = {
      username: window.location.search.slice(10),
      text: messageText,
      roomname: window.document.getElementById("form-control").value
    };
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
    $('#new-message').val('');
  }

    var createRoom = function() {
      var newRoom = prompt('New room name: ');
      if (newRoom === null || newRoom.replace(/\s/g, '') === '') {
        return;
      } else {
        $('#form-control').append('<option value=' + newRoom + '>' + newRoom + '</option>');
      }
    };



  $(document).ready(function() {

      $('#send-new-message').click(function() {
        postMessage();
      });

      $('textarea').keydown(function(e){
          if(e.keyCode === 13 && e.shiftKey)
          {
            postMessage();
            if(event.preventDefault) event.preventDefault();
            return false;
          }
      });

      $('#create-room').click(function() {
        createRoom();
      });

      $(document).on('click', '.username', function() {
        var friend = $(this).text();
        if (!(friend in friends)) {
          console.log('added');
          console.log(friends);
          friends[friend] = true;
          $('.' + friend).addClass('friend');
        }
      });

    });

    console.log(window.location.search.slice(10));






    //SAMPLE DATA [0]
    // createdAt
    // :
    // "2017-02-08T21:36:01.219Z"
    // objectId
    // :
    // "W80qhTCsOS"
    // roomname
    // :
    // "lobby"
    // text
    // :
    // "first"
    // updatedAt
    // :
    // "2017-02-08T21:36:01.219Z"
    // username
    // :
    // "dan"
}());
