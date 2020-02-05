$(function () {

    let socket = io();

    let user = '';

    // DOM

    let $messages = $('#messages');
    let $messageForm = $('#messageForm');
    let message = document.getElementById('message');
    let $chat = $('#chat');

    let feedback = document.getElementById('feedback');

    let $userLogin = $('#userLogin');
    let $userForm = $('#userForm');
    let $username = $('#username');

    let $usersList = $('#users');

    $userLogin.show();
    $messages.hide();

    // Event listeners

    message.addEventListener('keypress', function() {
        socket.emit('typing', user);
    });

    $messageForm.submit(function(e) {
        e.preventDefault();
        socket.emit('send message', message.value);
        message.value;
    });

    socket.on('new message', function(data) {
        $chat.append(`<div class="well"><strong>${data.user}</strong>  ${data.msg}</div>`)
    });

    socket.on('typing', function(data) {
        feedback.innerHTML = `<p><em>${data} is typing...</em></p>`
    });

    $userForm.submit(function(e) {
        e.preventDefault();
        socket.emit('new user', $username.val(), function(data){
            if (data) {
                user = $username.val();
                $userLogin.hide();
                $messages.show();
            }
        });
    });

    socket.on('get users', function(data) {
        let html = '';

        for(i = 0; i < data.length; i++) {
            html += `<li class="list-group-item">${data[i]}</li>`;
        }

        $usersList.html(html);
    });
});