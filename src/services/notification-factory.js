/*jshint -W116 */

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
  .factory('NotificationFactory', ['$window', 'NotificationUtils',
    function($window, NotificationUtils) {

      // notification actions
      var BROADCAST_ACTION, NOTIFY_ACTION;

      // notification types
      var DEFAULT_NOTIF, CALL_NOTIF;

      function handleWebNotification(options) {

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
            var url = options.message.targetUrl || '/home#/call/room/';
            $window.open(url + options.data.message.roomId,
              '_self');
            callNotification.close();
          });
        }
      }

      function handleRegularNotification(options) {

        $.pnotify.defaults.history = false;

        if (BROADCAST_ACTION) {
          $.pnotify({
            title: 'Broadcast',
            text: options.data.message,
            addclass: 'custom ng-kabam-notification'
          });
        } else if (DEFAULT_NOTIF) {
          $.pnotify({
            title: 'Notification from ' + options.data.message.from,
            text: options.data.message.text,
            addclass: 'custom ng-kabam-notification'
          });
        } else if (CALL_NOTIF) {
          var ACCEPT_BUTTON = '<a id="accept-call" ' +
            'class="btn btn-mini btn-success" ' +
            'target="_self" ' +
            'href="/home#/call/room/' + options.data.message.roomId +
            '">Accept</a> ';

          var REJECT_BUTTON = '<a id="accept-reject" ' +
            'class="btn btn-mini btn-danger" ' +
            'href="/call/reject/room/' + options.data.message.roomId +
            '">Reject</a>';

          var callNotifBodyMessage = '<div id="call-action">' + ACCEPT_BUTTON +
            REJECT_BUTTON + '</div>';

          $.pnotify({
            title: 'You got call!',
            text: callNotifBodyMessage,
            addclass: 'custom ng-kabam-notification',
            hide: false
          }).click(function(e) {
            // if the element is clicked element then hide it
            var CALL_BUTTONS_CLICKED = $(e.target).is('#accept-call') ||
              $(e.target).is('#accept-reject');

            if (CALL_BUTTONS_CLICKED) $('.ng-kabam-notification').hide();
          });
        }
      }

      return {
        createNotification: function(options) {
          // notification actions
          BROADCAST_ACTION = options.action === 'broadcast';
          NOTIFY_ACTION = options.action === 'notify';

          // notification types
          DEFAULT_NOTIF = NOTIFY_ACTION && options.data.type === 'default';
          CALL_NOTIF = NOTIFY_ACTION && options.data.type === 'call';

          if (NotificationUtils.isSupported()) {
            handleWebNotification(options);
          } else if (!NotificationUtils.isSupported()) {
            handleRegularNotification(options);
          }
        }
      };
    }
  ]);
