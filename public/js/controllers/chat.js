'use strict';

angular.module('mean.chat').controller('ChatController', ['$scope','$window', '$routeParams', '$location', 'Global', 'Socket', function ($scope, $window, $routeParams, $location, Global, Socket) {
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
        Socket.emit('user:leaveAllRoom');
        getRoomList();

        angular.element('#create_room_modal').on('shown', function(){
            angular.element('#room_name').focus();
        });
    };

    $scope.createNewRoom = function(){
        angular.element('#create_room_modal').modal('hide');
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
    $scope.joinRoom = function(){
        if(!this.room_id || this.room_id.length < 1){
            alert('방을 선택해 주세요.');
            return ;
        }
        $scope.socketInfo.room = {
            name: this.room_name,
            id: this.room_id
        };
        $location.path('chat/' + $scope.socketInfo.room.id);
    };

    $scope.join = function(){
        angular.element('.modal-backdrop').remove();
        var room = {
            name: '',
            id: $routeParams.roomId
        };
        //방 있는지 검증
        Socket.emit('room:knock', {
            room: room
        }, function(data){
            if(data.result){
                $scope.socketInfo = {
                    user:{
                        name: Global.user.username,
                        id: Global.user._id
                    },
                    room: data.room
                };
                Socket.emit('user:join', $scope.socketInfo);
            }else{
                alert('올바르지 않은 접근입니다.');
                $location.path('chat/');
            }
        });
    };

    $scope.sendMeesage = function(){
        if(this.input_message.trim()){
            Socket.emit('user:sendMessage',{
                room: $scope.socketInfo.room,
                user: $scope.socketInfo.user,
                message: this.input_message
            });
            this.input_message = '';
        }
    };

    // Socket listeners
    // ================
    Socket.on('room:updateRoomList', function (data) {
        updateRoomList(data);
    });

    Socket.on('room:updateUserList', function (data) {
        $scope.users = data.users;
    });

    Socket.on('message:add', function (data) {
        $scope.messages.push(data);
        angular.element('#div_messages').animate({scrollTop:angular.element('#div_messages')[0].scrollHeight},'fast');
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