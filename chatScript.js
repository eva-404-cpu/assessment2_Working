// Import the files/ modules needed for the chat application
const express = require("express");
const socket = require("socket.io");
const path = require("path")

// Create a new instance of the express framework
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
  // When a new user enters the chat, they are added to the 'active users' list 
  // which is displayed to everyone in the chat
  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("disconnect", function () {
    // When a user disconnected, the event 'user disconnected' is sent to the client 
    // which results in the user being removed from the active users list and an alert
    // informing the other users  of their exit
    if(socket.userId) {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);}
  });

  // When a message is entered, the server sends it to the client so that a message can 
  // appear in the chat history
  socket.on("chat message", function (data) {
    io.emit("chat message", data);
  });

  // When the event 'typing' is sent to the server, the 'User is typing...' message 
  // is displayed to everyone but the user
  socket.on("typing",(name) => {
    socket.broadcast.emit("typing",name)
  })

  // When the event 'notTyping' is sent to the server, the 'User is typing.. ' message is cleared for everyone but the user
  // Since it doesn't appear on the user's screen the message is 'cleared' completely
  socket.on("notTyping",name => {
    socket.broadcast.emit("notTyping",name);
  }) 

  });