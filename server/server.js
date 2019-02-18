const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require("./utils/message");

io.on("connection", socket => {
  console.log("socket connected!!");

  socket.on("disconnect", () => {
    console.log("user was disconnected!");
  });

  // listen event
  socket.on("createMessage", (message, callback) => {
    // emit event
    io.emit("newMessage", generateMessage(message.from, message.text));
  });

  socket.on("createLocation", coor => {
    socket.emit(
      "newMessage",
      io.emit(
        "newLocationMessage",
        generateLocationMessage("Admin", coor.latitude, coor.longitude)
      )
    );
  });
});

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "../public")));

server.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
