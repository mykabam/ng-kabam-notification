/**
 * @overview Web Notification service for Kabam application
 * @ngdoc service
 *
 * @description service that carry out specific tasks like
 * requesting permission, checking the notification permission status,
 * so this Notification service kinda like a wrapper to access the
 * Web Notification.
 *
 * Notes on Google Chrome usage:
 * There's one very important caveat about requesting permission:
 * the page can only request permission when a user initiates some action on
 * a page, in this case, clicking on a button. So, when using this directive
 * only click event will work best on Google Chrome, otherwise will not be
 * working as expected.
 */
angular.module('ng-kabam-notification', [
  // 3rd party dependencies
  'btford.socket-io'
])
  .config(['socketProvider',
    function(socketProvider) {
      var kabamSocket = io.connect();
      // do stuff with kabamSocket
      socketProvider.ioSocket(kabamSocket);
    }
  ])
  .factory('NotificationFactory', function() {
    return {
      createNotification: function(options) {
        if (options.notificationType === 'broadcast') {
          new Notification('Broadcast', {
            body: options.data.message
          });
        }
      }
    };
  })
  .factory('WebNotification', ['NotificationFactory',
    function(NotificationFactory) {
      return {

        /**
         * To check if Web Notification is supported or not in running browser.
         * @return {Boolean} return true if Web Notification is supported
         */
        isSupported: function() {
          var webNotifIsSupported = ('Notification' in window) ? true : false;
          return webNotifIsSupported;
        },
        /**
         * To request Web Notification permission
         */
        requestPermission: function() {
          var userAgent = navigator.userAgent,
            notification = null;

          var FIREFOX_USER_AGENT = userAgent.match(/Firefox\//),
            CHROME_USER_AGENT = userAgent.match(/Chrome\//);

          if (FIREFOX_USER_AGENT) {
            notification = Notification;
          } else if (CHROME_USER_AGENT) {
            notification = webkitNotifications;
          }

          if (notification && notification.permission !== 'denied') {

            notification.requestPermission(function(status) {
              if (notification.permission !== status) {
                notification.permission = status;
              }
            });
          }
        },
        /**
         * Show notification
         * @param {String} notification type, can be any of these type:
         * 'broadcast', 'notify', 'call'
         */
        show: function(type, data) {
          NotificationFactory.createNotification({
            notificationType: type,
            data: data
          });
        }
      };
    }
  ]);