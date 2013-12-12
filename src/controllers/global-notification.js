angular.module('ng-kabam-notification')
  .controller('GlobalNotificationCtrl', ['socket', 'WebNotification',
    function(socket, WebNotification) {
      socket.on('broadcast', function(data) {
        WebNotification.show('broadcast', data);
      });

      socket.on('notify', function(data) {
        WebNotification.show('notify', data);
      });
    }
  ]);