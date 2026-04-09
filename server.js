const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const players = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send the current players to the new player
  socket.emit("currentPlayers", players);

  // New player joins
  socket.on("newPlayer", (playerData) => {
    players[socket.id] = {
      x: playerData.x || 400,
      y: playerData.y || 300,
      id: socket.id,
      username: playerData.username || "Anonymous",
      avatarType: playerData.avatarType || 1,
      groups: playerData.groups || [] // Track joined groups
    };
    // Broadcast new player to others
    socket.broadcast.emit("playerJoined", players[socket.id]);
  });

  // Group update
  socket.on("updateGroups", (groups) => {
    if (players[socket.id]) {
      players[socket.id].groups = groups;
      io.emit("playerUpdated", players[socket.id]);
    }
  });

  // Movement update
  socket.on("playerMovement", (movementData) => {
    if (players[socket.id]) {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      // Broadcast movement to others
      socket.broadcast.emit("playerMoved", players[socket.id]);
    }
  });

  // Chat message
  socket.on("chatMessage", (message) => {
    io.emit("newMessage", {
      id: socket.id,
      username: players[socket.id]?.username || "Anonymous",
      text: message
    });
  });

  // Code synchronization for Coding Lab
  socket.on("codeUpdate", (codeData) => {
    // Broadcast code change to others in the same "room" or globally for now
    socket.broadcast.emit("codeChanged", codeData);
  });

  // Room-specific chat
  socket.on("sendRoomMessage", (messageData) => {
    io.emit("receiveRoomMessage", {
      ...messageData,
      senderId: socket.id,
      timestamp: new Date().toLocaleTimeString()
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
