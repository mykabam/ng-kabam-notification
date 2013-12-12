/**
 * @overview NotificationFactory
 * @ngdoc service
 *
 * @description a factory service that provide a service to construct
 * new Notification. The Notification object is used to configure and
 * display desktop notifications to the user. So, after we construct the
 * Notification, the notification dialog will show up.
 */
angular.module('ng-kabam-notification')
  .factory('NotificationFactory', ['$window',
    function($window) {
      return {
        createNotification: function(options) {
          // notification actions
          var BROADCAST_ACTION = options.action === 'broadcast',
            NOTIFY_ACTION = options.action === 'notify';

          // notification types
          var DEFAULT_NOTIF = NOTIFY_ACTION && options.data.type === 'default',
            CALL_NOTIF = NOTIFY_ACTION && options.data.type === 'call';

          if (BROADCAST_ACTION) {
            // required data payload structures
            // {
            //   message: 'Hi'
            // }
            new Notification('Broadcast', {
              body: options.data.message
            });
          } else if (DEFAULT_NOTIF) {

            // required data payload structures
            // {
            //   user: {
            //     username: 'user2'
            //   },
            //   message: {
            //     from: 'user1',
            //     text: 'Hi'
            //   },
            //   type: 'default'
            // }
            new Notification('Notification from ' + options.data.message.from, {
              body: options.data.message.text
            });
          } else if (CALL_NOTIF) {
            // required data payload structures
            // user: {
            //   username: 'callee'
            // },
            // message: {
            //   callee: 'callee',
            //   caller: 'caller',
            //   roomId: '34e971f0-7b67-4506-8f96-9855163477fc'
            // },
            // type: 'call'
            var callNotification = new Notification('You got call!', {
              body: options.data.message.caller + ' is calling. Click this notification to accept'
            });

            // when the notification window clicked then redirect to room view
            callNotification.addEventListener('click', function() {
              $window.open('/home#/call/room/' + options.data.message.roomId,
                '_self');
              callNotification.close();
            });

          }
        }
      };
    }
  ]);