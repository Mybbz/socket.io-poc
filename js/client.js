$(function() {
  const socket = io();

  $('#form').submit(function() {
    socket.emit('chat', $('#msg').val());
    $('#msg').val('');
    return false;
  });

  socket.on('chat', (msg) => {
    $('#messages').append($('<li>').text(msg));
  });
});
