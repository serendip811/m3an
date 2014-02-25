'use strict';

angular.module('mean.chat').controller('ChatController', ['$scope', '$routeParams', '$location', 'Global', 'Socket', function ($scope, $routeParams, $location, Global, Socket) {
    $scope.global = Global;

    $scope.init = function(){
        console.log('init : ' + Global.user.username);
        Socket.emit('user:join', {
            name: Global.user.username
        });
    };

    // Socket listeners
    // ================
    Socket.on('send:message', function (data) {
        console.log('send:message');
        console.log(data);
        $scope.messages.push(data);
    });

    Socket.on('user:join', function (data) {
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

    $scope.messages = [];

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

}]);