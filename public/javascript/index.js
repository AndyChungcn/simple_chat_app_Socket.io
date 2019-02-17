var socket = io();
socket.on("connect", function() {
  console.log("socket connected to server!");

  // emit newEmail event

  socket.emit("createMessage", {
    author: "andychung",
    text: "how are you dude?"
  });
});

socket.on("disconnect", function() {
  console.log("socket disconnected!");
});

// listen to newEmail event

socket.on("newMessage", function(message) {
  console.log("new message: ", message);
});
