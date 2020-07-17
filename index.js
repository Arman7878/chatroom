var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var chats = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    socket.on('chat message', (msg) => {
        chat = `${socket.color}:${socket.username}:${msg}`
        io.emit('chat message', chat);
        chats.push(chat)
    });
    socket.on('register', (name) => {
        color = "#"+((1<<24)*Math.random()|0).toString(16)
        socket.username = name;
        socket.color = color
        console.log(`the user with name ${socket.username} is registered`)
        io.emit('get messages', chats);
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});