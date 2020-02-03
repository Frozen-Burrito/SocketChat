let express = require('express');
let socket = require('socket.io');

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
    console.log('New connection')

    socket.on('send message', function(data) {
        io.sockets.emit('new message', data);
    });
});