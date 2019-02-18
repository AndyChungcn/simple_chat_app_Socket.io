var socket = io();

function scrollToBottom() {
  // Selectors
  var messages = $("#messages");
  var newMessage = messages.children("li:last-child");
  // Heights
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("connect", function() {
  var params = $.deparam(window.location.search);

  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

socket.on("disconnect", function() {
  console.log("socket disconnected!");
});

// listen event

// Update User List
socket.on("updateUserList", function(users) {
  var ol = $("<ol></ol>");

  users.forEach(function(user) {
    ol.append($("<li></li>").text(user));
  });

  $("#users").html(ol);
});

// New Message
socket.on("newMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
  scrollToBottom();
});

// New Location Message
socket.on("newLocationMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  $("#messages").append(html);
  scrollToBottom();
});

// Send Message
$("#message-form").on("submit", function(e) {
  e.preventDefault();

  var messageTextbox = $("[name=message]");

  socket.emit(
    "createMessage",
    {
      text: messageTextbox.val()
    },
    function() {
      messageTextbox.val("");
    }
  );
});

// Send Location Message
var locationButton = $("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    alert("your browser doesn't support geolocation");
  }
  locationButton.attr("disabled", "disabled").text("sending location...");
  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr("disabled").text("Send location");
      socket.emit("createLocation", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      if (failure.message.startsWith("Only secure origins are allowed")) {
        // Secure Origin issue.
        alert("Only secure origins are allowed");
      }
      locationButton.removeAttr("disabled").text("Send location");
      alert("Unable to fetch location.");
    }
  );
});
