const express = require("express");
const socket = require("socket.io");
const path = require("path");

const app = express();

// App setup
const PORT = 3000;
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// Static files
app.use(express.static("public"));

// Route to chat.html
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat.html"));
});

// Socket setup
const io = socket(server);

const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers]);
    io.emit("userJoined", {
  user: data,
  message: "has joined!"
});
  });

  socket.on("disconnect", function () {
    if(socket.userId) {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);}
  });

  socket.on("chat message", function (data) {
    io.emit("chat message", data);
  });

  socket.on('typing',(name) => {
    socket.broadcast.emit('typing',name)
  })
  });