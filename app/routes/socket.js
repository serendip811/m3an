'use strict';

var roomList = [];

// export function for listening to the socket
module.exports = function (socket, io) {

    socket.on('room:getRoomList', function(data, callback){
        data='';
        callback({
            rooms: roomList
        });
    });

    socket.on('room:createNewRoom', function(data, callback){
        if(!roomList || roomList.length < 1){
            roomList = [];
        }
        roomList.push(data.room);
        updateRoomList();
        callback({
            room: data.room
        });
    });

    socket.on('user:leaveRoom', function(data){
        leaveRoom(data.room.id);
    });

    socket.on('user:join', function(data){
        socket.user = data.user;
        socket.join(data.room.id);
        updateUserList(data.room.id);
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        var rooms = io.sockets.manager.roomClients[socket.id];
        for (var room in rooms) {
            if (room.length > 0) {
                leaveRoom(room.substr(1));
            }
        }
    });

    var leaveRoom = function(room_id){
        socket.leave(room_id);
        var users = io.sockets.clients(room_id);
        if(!users || users.length < 1){
            var tmp_roomList = [];
            for (var i = 0; i < roomList.length; i++) {
                /*jslint eqeq: true*/
                if(roomList[i].id != room_id){
                    tmp_roomList.push(roomList[i]);
                }
            }
            roomList = tmp_roomList;
        }
        updateRoomList();
    };

    var updateRoomList = function(){
        socket.broadcast.emit('room:updateRoomList', {
            rooms : roomList
        });
    };

    var updateUserList = function(room_id){
        var clients = io.sockets.clients(room_id);
        var users = [];
        for (var key in clients) {
            users.push(clients[key].user);
        }
        io.sockets.in(room_id).emit('room:updateUserList', {
            users : users
        });
    };
/*    socket.on('user:join', function (data) {
        joinRoom(data);
    });

    var joinRoom = function(data){
        leaveRoom();
        socket.user = data.user;
        socket.join(data.room.name);
        updateUserList(data.room);
        updateRoomList();
    };

    socket.on('user:createNewRoom', function (data, callback) {
        joinRoom(data);

        var roomList = io.sockets.manager.rooms;
        callback({
            room_id : roomList['/'+data.room.name]
        });
    });

    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            user: socket.name,
            text: data.message
        });
    });



    var joinRoom = function(data){
        leaveRoom();
        socket.user.name = data.user.name;
        socket.join(data.room.name);
        updateUserList(data.room);
        updateRoomList();
    };

    var updateUserList = function(room){
        var clients = io.sockets.clients(room.name);
        var users = [];
        for (var key in clients) {
            users.push(clients[key].name);
        }
        io.sockets.in(room.name).emit('update:userList', {
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
*/
};