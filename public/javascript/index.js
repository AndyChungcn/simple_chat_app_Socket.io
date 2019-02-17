var socket = io();
socket.on("connect", function() {
  console.log("socket connected to server!");

  // emit newEmail event
  socket.emit("createEmail", {
    to: "andy@gmail.com",
    text: "hows going?"
  });

  socket.emit("createMessage", {
    author: "andychung",
    text: "how are you dude?"
  });
});

socket.on("disconnect", function() {
  console.log("socket disconnected!");
});

// listen to newEmail event
socket.on("newEmail", function(email) {
  console.log("new email received", email);
});

socket.on("newMessage", function(message) {
  console.log("new message: ", message);
});
