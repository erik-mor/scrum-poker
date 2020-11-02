const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 5000;

const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  setVote,
} = require("./helper");

io.on("connection", (socket) => {
  console.log("New connection established.");

  socket.on("join", ({ name, id }) => {
    console.log(name, id);

    // new user

    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { newUser(sessionId: "${id}", name: "${name}") { id } }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
      });

    addUser(socket.id, name, id);

    // query users
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ users(sessionId: "${id}") { id, name, vote, hasVoted } }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.users.length);
      });

    const users = getUsersInRoom(id);

    if (users.length === 1) {
      socket.emit("isMaster");
    }

    socket.join(id);

    io.to(id).emit("connectedUsers", { users });
  });

  socket.on("vote", (vote) => {
    // vote
    setVote(socket.id, vote.value);

    io.to(vote.id).emit("connectedUsers", { users: getUsersInRoom(vote.id) });
  });

  socket.on("create", () => {
    // user
    const user = getUser(socket.id);

    // users
    getUsersInRoom(user.room).map((user) => {
      user.hasVoted = false;
      user.vote = null;
      return user;
    });
    io.to(user.room).emit("onCreate");
    io.to(user.room).emit("connectedUsers", {
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("show", () => {
    const user = getUser(socket.id);

    io.to(user.room).emit("onShow");
  });

  socket.on("disconnect", () => {
    const userToRemove = removeUser(socket.id);
    if (userToRemove) {
      console.log(`User ${userToRemove.name} has left`);
      io.to(userToRemove.room).emit("connectedUsers", {
        users: getUsersInRoom(userToRemove.room),
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
