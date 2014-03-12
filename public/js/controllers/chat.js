'use strict';

angular.module('mean.chat').controller('ChatController', ['$scope', '$routeParams', '$location', 'Global', 'Socket', function ($scope, $routeParams, $location, Global, Socket) {
    $scope.global = Global;
    $scope.socketInfo = '';
    $scope.messages = [];
    $scope.users = [];
    $scope.rooms = [];

    $scope.getRoomList = function(){
        getRoomList();
    };

    $scope.leaveRoom = function(){
        Socket.emit('user:leaveRoom', {
            room: $scope.socketInfo.room
        });
    };


    //init
    $scope.init = function(){
        $scope.socketInfo = {
            user:{
                name: Global.user.username,
                id: Global.user._id
            },
            room:{
                name: '',
                id:''
            }
        };

        getRoomList();
    };

    $scope.createNewRoom = function(){
        $scope.socketInfo.room = {
            name: this.room_name,
            id: Date.now()
        };
        Socket.emit('room:createNewRoom', {
            room: $scope.socketInfo.room
        },function(data){
            $location.path('chat/' + data.room.id);
        });

        this.room_name = '';
    };

    $scope.join = function(){
        // $routeParams.roomId 이런 방이 있는지 검증해야 함?
        // 아니면 그냥 만들어버리긔?
        $scope.socketInfo = {
            user:{
                name: Global.user.username,
                id: Global.user._id
            },
            room:{
                name: '',
                id: $routeParams.roomId
            }
        };
        Socket.emit('user:join', $scope.socketInfo);
    };

    // Socket listeners
    // ================
    Socket.on('room:updateRoomList', function (data) {
        updateRoomList(data);
    });

    Socket.on('room:updateUserList', function (data) {
        console.log(data);
        $scope.users = data.users;
    });

    // functions
    // ================
    function getRoomList(){
        Socket.emit('room:getRoomList', null, function(data){
            updateRoomList(data);
        });
    }
    function updateRoomList(data){
        $scope.rooms = data.rooms;
        $scope.checkDisableRoomList = $scope.rooms.length>0 ? false : true;
    }


/*
    //join to room
    $scope.join = function(){
        Socket.emit('user:join', {
            user:{
                name: Global.user.username
            }
        });
    };


    // Socket listeners
    // ================
    Socket.on('send:message', function (data) {
        console.log('send:message');
        console.log(data);
        $scope.messages.push(data);
    });

    Socket.on('room:updateUserList', function (data) {
        $scope.users = [];
        for (var i = data.users.length - 1; i >= 0; i--) {
            $scope.users.push({
                name: data.users[i]
            });
        }
    });

    Socket.on('update:roomList', function (data) {
        $scope.rooms = [];
        for (var i = data.rooms.length - 1; i >= 0; i--) {
            $scope.rooms.push({
                name: data.rooms[i]
            });
        }
    });

    Socket.on('user:join', function (data) {
        $scope.users.push({
            name: data.name
        });
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has joined.'
        });
    });

    // add a message to the conversation when a user disconnects or leaves the room
    Socket.on('user:left', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has left.'
        });
    });


    $scope.sendMessage = function(){
        Socket.emit('send:message', {
            message: $scope.message
        });

        $scope.messages.push({
            user: Global.user.username,
            text: $scope.message
        });

        $scope.message = '';
    };
*/
}]);