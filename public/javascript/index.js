var socket = io();
socket.on("connect", function() {
  console.log("socket connected to server!");
});

socket.on("disconnect", function() {
  console.log("socket disconnected!");
});

// listen event

socket.on("newMessage", function(message) {
  console.log("new message: ", message);
  var li = `<li>from: ${message.from} mes: ${message.text}</li>`;
  $("#showMessages").append(li);
});

socket.on("newLocationMessage", function(message) {
  var li = "<li></li>";
  var a = '<a target="_blank">My Current Location</a>';
  li.text = message.from;
  a.attr("href", message.url);
  li.append(a);
  $("#showMessages").append(li);
});

$("#form-selector").on("submit", e => {
  e.preventDefault();

  socket.emit("createMessage", {
    from: $("[name=userName]").val(),
    text: $("[name=message]").val()
  });
});

$("#send-location").on("click", function() {
  if (!navigator.geolocation) {
    alert("your browser doesn't support geolocation");
  } else {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log("success");
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        socket.emit("createLocation", {
          latitude,
          longitude
        });
      },
      function() {
        console.log("Unable to fetch location");
      }
    );
  }
});
