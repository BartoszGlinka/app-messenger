const express = require('express');
const app = express();
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const socket = require('socket.io');
const io = socket(server)
const path = require('path');

/*arrey to data*/
const messages = [];
const users = [];

/*listeners*/
io.on('connection', (socket) => {
  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('newUser', (user) => {
    socket.broadcast.emit('newUser', user);
  });
  
  socket.on('join', login => {
    users.push({name: login ,id: socket.id});
  });

  socket.on('disconnect', () => { 
    let user = users.find(user => user.id === socket.id);
    let userIndex = users.indexOf(user);
    users.splice(user, 1);
    socket.broadcast.emit('removeUser', user.name);
  });
});

app.use(express.static(path.join(__dirname, '/client')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})