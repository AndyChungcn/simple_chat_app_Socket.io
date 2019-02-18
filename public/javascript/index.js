var socket = io();
socket.on("connect", function() {
  console.log("socket connected to server!");
});

socket.on("disconnect", function() {
  console.log("socket disconnected!");
});

// listen event

socket.on("newMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
});

socket.on("newLocationMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  $("#messages").append(html);
});

$("#message-form").on("submit", e => {
  e.preventDefault();

  var messageTextbox = $("[name=message]");

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageTextbox.val()
    },
    function() {
      messageTextbox.val("");
    }
  );
});

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
