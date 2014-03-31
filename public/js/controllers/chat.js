'use strict';

angular.module('mean.chat').controller('ChatController', ['$scope','$window', '$routeParams', '$location', 'Global', 'Chat', function ($scope, $window, $routeParams, $location, Global, Chat) {
    $scope.global = Global;
    $scope.socketInfo = '';
    $scope.messages = [];
    $scope.users = [];
    $scope.rooms = [];

    // scope...
    // ========

    $scope.$on('$locationChangeStart', function (event, next, current) {
        // http://localhost:3000/#!/chat/1395210609407
        // => ["#!", "chat", "1395210609407"]
        current = current.substr(current.indexOf('#!')).split('/');
        next = next.substr(next.indexOf('#!')).split('/');

        if(current.length > 0){
            // current  = http://localhost:3000/#!/chat/1395210609407
            // next     = http://localhost:3000/#!/chat
            /*jslint eqeq: true*/
            if(current[1] == 'chat' && current[2] && !next[2]){
                Chat.emit('user:leaveRoom', {
                    room: $scope.socketInfo.room
                });
            }
        }
    });

    // init
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
        Chat.emit('user:joinToLobby', $scope.socketInfo, function(data){
            updateRoomList(data);
        });

        angular.element('#create_room_modal').on('shown', function(){
            angular.element('#room_name').focus();
        });
    };

    // click "Create New Room" button
    $scope.createNewRoom = function(){
        angular.element('#create_room_modal').modal('hide');
        $scope.socketInfo.room = {
            name: this.room_name,
            id: Date.now()
        };
        Chat.emit('room:createNewRoom', {
            room: $scope.socketInfo.room
        }, function(data){
            $location.path('chat/' + data.room.id);
        });

        this.room_name = '';
    };

    // click "Join" button
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

    // room.html init
    $scope.join = function(){
        angular.element('.modal-backdrop').remove();
        var room = {
            name: '',
            id: $routeParams.roomId
        };
        //방 있는지 검증
        Chat.emit('room:knock', {
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
                Chat.emit('user:join', $scope.socketInfo);
            }else{
                alert('올바르지 않은 접근입니다.');
                $location.path('chat/');
            }
        });
    };

    // send message
    $scope.sendMeesage = function(){
        if(this.input_message.trim()){
            Chat.emit('user:sendMessage',{
                room: $scope.socketInfo.room,
                user: $scope.socketInfo.user,
                message: this.input_message
            });
            this.input_message = '';
        }
    };

    // Socket listeners
    // ================

    //update room list
    Chat.on('room:updateRoomList', function (data) {
        updateRoomList(data);
    });

    //update user list
    Chat.on('room:updateUserList', function (data) {
        $scope.users = data.users;
    });

    //add mesage
    Chat.on('message:add', function (data) {
        $scope.messages.push(data);
        angular.element('#div_messages').animate({scrollTop:angular.element('#div_messages')[0].scrollHeight},'fast');
    });

    // functions
    // =========
    
    // set room list
    function updateRoomList(data){
        $scope.rooms = data.rooms;
        $scope.checkDisableRoomList = $scope.rooms.length>0 ? false : true;
    }
}]);