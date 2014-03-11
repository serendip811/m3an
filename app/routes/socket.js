'use strict';

// export function for listening to the socket
module.exports = function (socket, io) {
    
    socket.on('user:join', function (data) {
        joinRoom(data);
    });
    
    socket.on('user:createNewRoom', function (data, callback) {
        joinRoom(data);

        var roomList = io.sockets.manager.rooms;
        callback({
            room_id : roomList['/'+data.room]
        });
    });

    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            user: socket.name,
            text: data.message
        });
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        leaveRoom();
    });

    var joinRoom = function(data){
        leaveRoom();
        socket.name = data.name;
        socket.join(data.room);
        updateUserList(data.room);
        updateRoomList();
    };

    var updateUserList = function(room){
        var clients = io.sockets.clients(room);
        var users = [];
        for (var key in clients) {
            users.push(clients[key].name);
        }
        io.sockets.in(room).emit('update:userList', {
            users : users
        });
    };
    var updateRoomList = function(){
        var roomList = io.sockets.manager.rooms;
        var rooms = [];
        for (var key in roomList) {
            if(key.length > 0){
                rooms.push(key.substr(1));
            }
        }
        rooms = rooms.reverse();
        io.sockets.in('lobby').emit('update:roomList', {
            rooms : rooms
        });
    };
    var leaveRoom = function(){
        var rooms = io.sockets.manager.roomClients[socket.id];
        for (var room in rooms) {
            if (room.length > 0) {
                room = room.substr(1);
                socket.leave(room);
                updateUserList(room);
            }
        }
    };
};