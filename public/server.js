const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
    socket.on("joinRoom", (room) => {
        socket.join(room);
    });

    socket.on("chatMessage", (data) => {
        io.to(data.room).emit("chatMessage", data.message);
    });
});

http.listen(3000, () => {
    console.log("Server running on port 3000");
});
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
