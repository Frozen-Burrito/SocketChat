$(function () {

    let socket = io();

    // DOM

    let $messages = $('#messages');
    let $messageForm = $('#messageForm');
    let $message = $('#message');
    let $chat = $('#chat');

    let $userLogin = $('#userLogin');
    let $userForm = $('#userForm');
    let $username = $('#username');

    let $usersList = $('#users');

    $userLogin.show();
    $messages.hide();

    $messageForm.submit(function(e) {
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });

    socket.on('new message', function(data) {
        $chat.append(`<div class="well"><strong>${data.user}</strong>  ${data.msg}</div>`)
    });

    $userForm.submit(function(e) {
        e.preventDefault();
        socket.emit('new user', $username.val(), function(data){
            if (data) {
                $userLogin.hide();
                $messages.show();
            }
        });
        $username.val('');
    });

    socket.on('get users', function(data) {
        let html = '';

        for(i = 0; i < data.length; i++) {
            html += `<li class="list-group-item">${data[i]}</li>`;
        }

        $usersList.html(html);
    });
});