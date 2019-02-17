const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("socket connected!!");

  socket.on("disconnect", () => {
    console.log("user was disconnected!");
  });

  // Emit event
  socket.emit("newEmail", {
    from: "andy",
    to: "john",
    createdAt: 123
  });

  socket.emit("newMessage", {
    author: "andychung",
    text: "socke.io is cool huh?"
  });

  // listen event
  socket.on("createEmail", newEmail => {
    console.log(newEmail);
  });

  socket.on("createMessage", newMessage => {
    console.log("new message: ", newMessage);
  });
});

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "../public")));

server.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
