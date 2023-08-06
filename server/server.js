import express from "express";
import colors from "colors";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";

// Init Express.
const app = express();
const __dirname = path.resolve();

// Create httpServer.
const httpServer = createServer(app);

// Init socket.io.
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  // Get socketID.
  const socketID = socket.id;
  socket.emit("cid", socketID);

  socket.on("msg", (data) => {
    if (data.room === "") {
      io.sockets.emit("chat", data);
    } else {
      socket.join(data.room);
      io.sockets.to(data.room).emit("chat", data);
    }
  });
});

// Listen Server.
httpServer.listen(5050, () => {
  console.log(` Server is running on port 5050`.bgMagenta.black);
});
