let express = require('express');
let socket = require('socket.io');

users = [];
connections = [];

// App Setup
let app = express();
let server = app.listen(4000, function() {
    console.log("Server is up on port 4000")
});

// Static files
app.use(express.static('public'));

//Socket setup
let io = socket(server);

io.on('connection', function (socket) {

    connections.push(socket);
    console.log('Connected: %s sockets', connections.length);

    // Disconnect from server
    socket.on('disconnect', function (data) {
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets', connections.length);
    });

    // Send a message
    socket.on('send message', function (data) {
        io.sockets.emit('new message', { msg: data, user: socket.username});
    });

    // New user
    socket.on('new user', function (data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    // Update list
    function updateUsernames() {
        io.sockets.emit('get users', users);
    }
});