const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } =  require('./helper')


io.on('connection', (socket) => {
    console.log('New connection established.')

    
    socket.on('join', ({name, id}) => {
        console.log(name, id);
        
        addUser(socket.id, name, id)

        socket.join(id);

        console.log(getUsersInRoom(id));

        io.to(id).emit('connectedUsers', { users: getUsersInRoom(id) });

    });

    socket.on('vote', vote => {

        io.to(vote.id).emit('onVote', {user: vote.user, value: vote.value});
    });


    socket.on('disconnect', () => {

        console.log(`User has left`);
        removeUser(socket.id);

    });
});

app.use(router);

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));

 