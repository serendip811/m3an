'use strict';

var lobby;
var roomList = [];

// export function for listening to the socket
module.exports = function (socket, io, namespace) {

    socket.on('user:joinToLobby', function(data, callback){
        if(!lobby){
            console.log('MAKE LOBBY');
            lobby = {
                name: 'lobby',
                id: Date.now()
            };
        }
        leaveAllRoom();
        socket.user = data.user;
        socket.join(lobby.id);
        callback({
            rooms: roomList
        });
    });

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

    socket.on('room:knock', function(data, callback){
        var result = {
            result: false,
            room: {
                name: '',
                id: ''
            }
        };
        for (var i = 0; i < roomList.length; i++) {
            /*jslint eqeq: true*/
            if(roomList[i].id == data.room.id){
                result.result = true;
                result.room = roomList[i];
                break;
            }
        }
        callback(result);
        if(!result.result){
            leaveAllRoom();
        }
    });

    socket.on('user:leaveRoom', function(data){
        leaveRoom(data.room.id);
    });

    socket.on('user:leaveAllRoom', function(){
        leaveAllRoom();
    });

    socket.on('user:join', function(data){
        socket.join(data.room.id);
        updateUserList(data.room.id);
        sendSystemMessage(data.room.id, socket.user.name+'님이 입장하셨습니다.');
    });

    socket.on('user:sendMessage', function(data){
        sendMessage(data.user, data.room.id, data.message);
    });

    socket.on('disconnect', function () {
        leaveAllRoom();
    });


    var leaveAllRoom = function(){
        var rooms = io.of(namespace).manager.roomClients[socket.id];
        for (var room in rooms) {
            /*jslint eqeq: true*/
            if (room.length > 0 && room != namespace) {
                leaveRoom(room.substr(1));
            }
        }
    };

    var leaveRoom = function(room_id){
        socket.leave(room_id);
        /*jslint eqeq: true*/
        if(room_id != lobby.id){
            var users = io.of(namespace).clients(room_id);
            if(!users || users.length < 1){
                //remove room
                var tmp_roomList = [];
                for (var i = 0; i < roomList.length; i++) {
                    /*jslint eqeq: true*/
                    if(roomList[i].id != room_id){
                        tmp_roomList.push(roomList[i]);
                    }
                }
                roomList = tmp_roomList;
                updateRoomList();
            }else{
                updateUserList(room_id);
                sendSystemMessage(room_id, socket.user.name+'님이 퇴장하셨습니다.');
            }
        }
    };

    var updateRoomList = function(){
        io.of(namespace).in(lobby.id).emit('room:updateRoomList', {
            rooms : roomList
        });
    };

    var updateUserList = function(room_id){
        var clients = io.of(namespace).clients(room_id);
        var users = [];
        for (var key in clients) {
            users.push(clients[key].user);
        }
        io.of(namespace).in(room_id).emit('room:updateUserList', {
            users : users
        });
    };

    var sendSystemMessage = function(room_id, text){
        var sysUser = {
            id:'',
            name:'system'
        };
        sendMessage(sysUser, room_id, text);
    };

    var sendMessage = function(user, room_id, text){
        io.of(namespace).in(room_id).emit('message:add', {
            user: user,
            text: text
        });
    };
};