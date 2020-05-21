let users = [];

const addUser = (id, name, room ) => {
 
  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (!existingUser) {
    const user = { id, name, room, hasVoted: false, vote: null };

    users.push(user);
  }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
  
    if(index !== -1) return users.splice(index, 1)[0];
}

const setVote = (id, vote) => {
    users.map((user) => {
        if (user.id === id) {
            user.hasVoted = true;
            user.vote = vote;
        }
        return user
    });
}
  
const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, setVote };