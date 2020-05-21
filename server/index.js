const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom, setVote } =  require('./helper')


io.on('connection', (socket) => {
    console.log('New connection established.')

    
    socket.on('join', ({name, id}) => {
        console.log(name, id);
        
        addUser(socket.id, name, id)

        socket.join(id);

        io.to(id).emit('connectedUsers', { users: getUsersInRoom(id) });

    });

    socket.on('vote', vote => {

        setVote(socket.id, vote.value);

        io.to(vote.id).emit('connectedUsers', { users: getUsersInRoom(vote.id) });
    });


    socket.on('disconnect', () => {

        const userToRemove = removeUser(socket.id);
        if (userToRemove) {
            console.log(`User ${userToRemove.name} has left`);
            io.to(userToRemove.room).emit('connectedUsers', { users: getUsersInRoom(userToRemove.room) });
        }


    });
});

app.use(router);

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));

 