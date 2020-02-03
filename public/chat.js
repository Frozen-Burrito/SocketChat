let socket = io();

// DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('sendBtn');

let output = document.getElementById('output');

// Send Message

btn.addEventListener('click', function () {
    socket.emit('send message', {
        message: message.value,
        handle: handle.value
    })
});

// Recieve messages
socket.on('new message', function(data) {
    output.innerHTML += `<p><strong>${data.handle} </strong>${data.message}</p>`;
});