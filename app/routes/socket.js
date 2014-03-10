'use strict';

// export function for listening to the socket
module.exports = function (socket, io) {
    socket.on('user:join', function (data) {
        socket.name = data.name;
        socket.join(data.room);
        refreshUserList(data.room);
    });

/*    socket.on('user:join', function (data) {
        console.log(data);
        socket.broadcast.emit('user:join', {
            name: socket.name
        });
    });*/

    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            user: socket.name,
            text: data.message
        });
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        var rooms = io.sockets.manager.roomClients[socket.id];
        for (var room in rooms) {
            if (room.length > 0) {
                room = room.substr(1);
                socket.leave(room);
                refreshUserList(room);
            }
        }
        
    });

    var refreshUserList = function(room){
        var clients = io.sockets.clients(room);
        var users = [];
        for (var i = clients.length - 1; i >= 0; i--) {
            users.push(clients[i].name);
        }
        io.sockets.in(room).emit('user:enter', {
            users : users
        });
    };
};