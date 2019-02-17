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

$("#form-selector").on("submit", e => {
  e.preventDefault();

  socket.emit("createMessage", {
    from: $("[name=userName]").val(),
    text: $("[name=message]").val()
  });
});
