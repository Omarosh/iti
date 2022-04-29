const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.render("index");
});

server = app.listen(3000);

const io = require("socket.io")(server);

//listen on new sockets
let count = 0;
io.on("connection", (socket) => {
  console.log(`New user connected (${count++})`);

  socket.username = "Omar";

  socket.on("change_username", (data) => {
    socket.username = data.username;
  });

  socket.on("new_message", (data) => {
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username,
    });
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", { username: socket.username });
  });
});
