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
});

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "../public")));

server.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
